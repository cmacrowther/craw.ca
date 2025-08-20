"use client";

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

interface ThreeBackgroundProps {
  className?: string
}

export function ThreeBackground({ className = "" }: ThreeBackgroundProps) {
  const threeRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // Inject animated gradient keyframes
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('animated-gradient-keyframes')) {
      const style = document.createElement('style');
      style.id = 'animated-gradient-keyframes';
      style.innerHTML = `
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    let renderer: THREE.WebGLRenderer | null = null;
    let animationId: number;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let particles: THREE.Mesh[] = [];
    let count = 0;
    
    // Reduced particle count for better performance
    const SEPARATION = 50, AMOUNTX = 60, AMOUNTY = 25;

    // Mouse and scroll state
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;
    let isMouseOver = false;
    let originalColors: THREE.Color[] = [];
    let scrollY = 0, targetFov = 100;

    // Determine theme-based colors
    const isLightTheme = theme === 'light';
    const backgroundColor = isLightTheme ? 0xffffff : 0x111111;
    const baseHue = isLightTheme ? 0 : 0.6;
    const baseSaturation = isLightTheme ? 0 : 0.6;
    const baseLightness = isLightTheme ? 0.1 : 0.65;

    if (threeRef.current) {
      const width = Math.min(window.innerWidth, 1920); // Limit canvas size
      const height = Math.min(window.innerHeight, 1080);
      
      camera = new THREE.PerspectiveCamera(100, width / height, 1, 10000);
      camera.position.y = 400;
      camera.position.z = 50;
      camera.rotation.y = 0.1;
      scene = new THREE.Scene();
      
      let i = 0;
      // Use simpler geometry for better performance
      const geometry = new THREE.SphereGeometry(1.2, 12, 12);
      
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          let color: THREE.Color;
          if (isLightTheme) {
            const lightness = baseLightness + 0.1 * Math.sin(iy / AMOUNTY * Math.PI);
            color = new THREE.Color().setHSL(0, 0, Math.max(0.05, lightness));
          } else {
            const t = ix / AMOUNTX;
            color = new THREE.Color().setHSL(baseHue - 0.2 * t, baseSaturation, baseLightness + 0.15 * Math.sin(iy / AMOUNTY * Math.PI));
          }
          const opacity = isLightTheme ? 0.6 + 0.3 * Math.sin(iy / AMOUNTY * Math.PI) : 0.45 + 0.25 * Math.sin(iy / AMOUNTY * Math.PI);
          const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
          const particle = particles[i++] = new THREE.Mesh(geometry, material);
          particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION - 10);
          scene.add(particle);
          originalColors.push(color.clone());
        }
      }
      
      const localRenderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: false, // Disable antialiasing for better performance
        powerPreference: "high-performance"
      });
      localRenderer.setSize(width, height);
      localRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
      localRenderer.setClearColor(backgroundColor, 1);
      threeRef.current.appendChild(localRenderer.domElement);
      renderer = localRenderer;

      // Optimized mouse events
      let animating = false;
      const handleMouseMove = (e: MouseEvent) => {
        if (!threeRef.current || animating) return;
        const rect = threeRef.current.getBoundingClientRect();
        const relY = (e.clientY - rect.top) / rect.height;
        if (relY >= 0.5 && relY <= 1) {
          isMouseOver = true;
          targetMouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
          targetMouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
        } else {
          isMouseOver = false;
          targetMouseX = 0;
          targetMouseY = 0;
        }
      };

      const handleMouseLeave = () => {
        isMouseOver = false;
        targetMouseX = 0;
        targetMouseY = 0;
      };

      // Throttled scroll handler for better performance
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            scrollY = window.scrollY;
            targetFov = 100 + scrollY * 0.02;
            ticking = false;
          });
          ticking = true;
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Optimized animation loop with reduced frequency
      let lastTime = 0;
      const targetFPS = 30; // Reduced FPS for better performance
      const fpsInterval = 1000 / targetFPS;
      
      function render(currentTime: number) {
        animationId = requestAnimationFrame(render);
        
        if (currentTime - lastTime < fpsInterval) return;
        lastTime = currentTime - ((currentTime - lastTime) % fpsInterval);

        animating = true;

        // Smooth mouse following
        smoothMouseX += (targetMouseX - smoothMouseX) * 0.05;
        smoothMouseY += (targetMouseY - smoothMouseY) * 0.05;
        mouseX = smoothMouseX * 400;
        mouseY = smoothMouseY * 400;

        // Update camera FOV based on scroll
        camera.fov += (targetFov - camera.fov) * 0.05;
        camera.updateProjectionMatrix();

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY + 400 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Simplified particle animation
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            const particle = particles[i];
            const baseY = iy * SEPARATION - (AMOUNTY * SEPARATION - 10);
            
            if (isMouseOver) {
              const distance = Math.sqrt(
                Math.pow(particle.position.x - mouseX * 0.1, 2) + 
                Math.pow(particle.position.z - (-mouseY * 0.1 + baseY), 2)
              );
              const influence = Math.max(0, 200 - distance) / 200;
              particle.position.y = Math.sin((ix + count) * 0.3) * 20 + influence * 50;
              
              // Simplified color shifting
              const meshMat = particle.material as THREE.MeshBasicMaterial;
              const originalColor = originalColors[i];
              if (influence > 0.1) {
                meshMat.color.setRGB(
                  Math.min(1, originalColor.r + influence * 0.3),
                  Math.min(1, originalColor.g + influence * 0.2),
                  Math.min(1, originalColor.b + influence * 0.5)
                );
              } else {
                meshMat.color.copy(originalColor);
              }
            } else {
              particle.position.y = Math.sin((ix + count) * 0.3) * 20;
              const meshMat = particle.material as THREE.MeshBasicMaterial;
              meshMat.color.copy(originalColors[i]);
            }
            i++;
          }
        }

        renderer!.render(scene, camera);
        count += 0.1;
        animating = false;
      }
      render(0);

      // Cleanup function
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('scroll', handleScroll);
        
        if (renderer) {
          renderer.dispose();
          renderer.domElement.remove();
        }
        
        // Dispose of geometries and materials
        geometry.dispose();
        particles.forEach(particle => {
          if (particle.material instanceof THREE.Material) {
            particle.material.dispose();
          }
        });
        particles = [];
      };
    }
  }, [theme]);

  return (
    <div 
      ref={threeRef} 
      className={`absolute inset-0 z-0 ${className}`}
      style={{ willChange: 'auto' }}
    />
  );
}
