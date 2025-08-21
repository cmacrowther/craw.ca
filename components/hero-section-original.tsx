"use client";

import { useEffect, useRef, useState } from "react"
import { ReactTyped } from "react-typed"
import { useTheme } from "next-themes"
import * as THREE from "three"

export function HeroSection() {
  // ...existing code...
  // ...existing code...
  const threeRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showTyped, setShowTyped] = useState(false)
  const { theme } = useTheme()

  // Choose gradient for animated text based on theme
  const animatedGradient = theme === 'light'
    ? 'linear-gradient(270deg, #0ea5e9, #f59e42, #f43f5e, #a21caf, #22c55e, #eab308, #0ea5e9)'
    : 'linear-gradient(270deg, #6EE7B7, #3B82F6, #A78BFA, #F472B6, #FDE68A, #6EE7B7)';

  // Inject animated gradient keyframes
  // Fade in three.js container after mount
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  // Show ReactTyped after fade-in transition (1.6s)
  useEffect(() => {
    if (isVisible) {
      const typedTimeout = setTimeout(() => setShowTyped(true), 1600);
      return () => clearTimeout(typedTimeout);
    }
  }, [isVisible]);

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
    const SEPARATION = 45, AMOUNTX = 100, AMOUNTY = 35;

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
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera = new THREE.PerspectiveCamera(100, width / height, 1, 10000);
      camera.position.y = 400;
      camera.position.z = 50;
      camera.rotation.y = 0.1;
      scene = new THREE.Scene();
      let i = 0;
      const geometry = new THREE.SphereGeometry(1.3, 20, 20);
      
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
      
      const localRenderer = new THREE.WebGLRenderer({ alpha: true });
      localRenderer.setSize(width, height);
      localRenderer.setClearColor(backgroundColor, 1);
      threeRef.current.appendChild(localRenderer.domElement);
      renderer = localRenderer;

      // Mouse events for wave modulation and color shift
      const handleMouseMove = (e: MouseEvent) => {
        if (!threeRef.current) return;
        const rect = threeRef.current.getBoundingClientRect();
        const relY = (e.clientY - rect.top) / rect.height;
        if (relY >= 0.5 && relY <= 1) {
          isMouseOver = true;
          targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          targetMouseY = (relY - 0.5) * 4 - 1;
          mouseX = (e.clientX - rect.left) / rect.width;
          mouseY = (relY - 0.5) * 2;
        } else {
          isMouseOver = false;
        }
      };
      
      const handleMouseLeave = () => {
        isMouseOver = false;
      };
      
      if (threeRef.current) {
        threeRef.current.addEventListener('mousemove', handleMouseMove);
        threeRef.current.addEventListener('mouseleave', handleMouseLeave);
      }

      // Scroll event for subtle FOV or Z movement
      const handleScroll = () => {
        scrollY = window.scrollY || window.pageYOffset;
        targetFov = 100 + Math.min(16, scrollY * 0.032);
      };
      window.addEventListener('scroll', handleScroll);

      function animate() {
        if (!isMouseOver) {
          targetMouseX = 0;
          targetMouseY = 0;
        }
        smoothMouseX += (targetMouseX - smoothMouseX) * 0.08;
        smoothMouseY += (targetMouseY - smoothMouseY) * 0.08;
        
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            const particle = particles[i];
            const meshMat = particle.material as THREE.MeshBasicMaterial;
            meshMat.color.copy(originalColors[i]);
            meshMat.needsUpdate = true;
            
            let phaseShift = 0;
            let amplitudeMod = 1;
            const PHASE_INTENSITY = 1.2;
            const AMPLITUDE_INTENSITY = 0.09;
            const AMPLITUDE_BASE = 1;
            
            if (isMouseOver) {
              phaseShift = smoothMouseX * PHASE_INTENSITY + smoothMouseY * (PHASE_INTENSITY * 0.6);
              amplitudeMod = AMPLITUDE_BASE + smoothMouseY * AMPLITUDE_INTENSITY;
            } else {
              phaseShift = smoothMouseX * PHASE_INTENSITY + smoothMouseY * (PHASE_INTENSITY * 0.6);
              amplitudeMod = AMPLITUDE_BASE + smoothMouseY * AMPLITUDE_INTENSITY;
            }
            
            particle.position.y =
              Math.sin((ix + count) * (0.45 + smoothMouseX * 0.035) + phaseShift) * 16 * amplitudeMod +
              Math.cos((iy + count) * (0.32 + smoothMouseY * 0.025) + phaseShift) * 12 * amplitudeMod;
            
            particle.position.z =
              (Math.sin((ix + count) * 0.18 + phaseShift) + Math.cos((iy + count) * 0.22 + phaseShift)) * 8 +
              iy * SEPARATION - (AMOUNTY * SEPARATION - 10);
              
            const scale = 1.2 + 0.45 * Math.sin((ix + count) * 0.25 + (iy + count) * 0.18 + phaseShift);
            particle.scale.set(scale, scale, scale);
            
            if (isMouseOver) {
              const px = ix / AMOUNTX;
              const py = iy / AMOUNTY;
              const dist = Math.sqrt((px - mouseX) ** 2 + (py - mouseY) ** 2);
              
              if (dist < 0.18) {
                if (isLightTheme) {
                  const lightnessShift = 0.1 * (1 - dist / 0.18);
                  const hsl = { h: 0, s: 0, l: 0 };
                  originalColors[i].getHSL(hsl);
                  meshMat.color.setHSL(hsl.h, hsl.s, Math.min(0.3, hsl.l + lightnessShift));
                } else {
                  const hueShift = 0.035 * (1 - dist / 0.18);
                  const hsl = { h: 0, s: 0, l: 0 };
                  originalColors[i].getHSL(hsl);
                  meshMat.color.setHSL(hsl.h + hueShift, hsl.s, hsl.l);
                }
                meshMat.needsUpdate = true;
              }
            }
            i++;
          }
        }
        
        camera.fov += (targetFov - camera.fov) * 0.04;
        camera.updateProjectionMatrix();
        
        if (renderer) {
          renderer.render(scene, camera);
        }
        count += 0.07;
        animationId = requestAnimationFrame(animate);
      }
      animate();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        if (renderer) {
          renderer.setSize(width, height);
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        if (threeRef.current) {
          threeRef.current.removeEventListener('mousemove', handleMouseMove);
          threeRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        }
        cancelAnimationFrame(animationId);
      };
    }
  }, [theme]);

  return (
    <section className="layout min-h-screen flex flex-col justify-between relative" style={{height: '100%'}}>
      {/* Three.js background with fade-in */}
      <div
        ref={threeRef}
        className="absolute inset-0 z-0"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1.6s cubic-bezier(0.4,0,0.2,1)',
        }}
      ></div>

      {/* Hero Headings Under Pixel Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[75%] w-full max-w-4xl text-left sm:text-center pointer-events-none select-none px-4 sm:px-0">
        <h1
          className="text-6xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-tight sm:leading-none lg:leading-none"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1.6s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          Hi, my name is{' '}
          <span
            className="animated-gradient-text"
            key={theme}
            style={{
              background: animatedGradient,
              backgroundSize: '1200% 1200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'gradientMove 36s ease-in-out infinite',
              fontWeight: 800,
            }}
          >
            Colin
          </span>
          .
        </h1>
        <div
          className="text-4xl sm:text-4xl lg:text-4xl max-w-2xl mx-auto leading-relaxed mt-4"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 300,
            minHeight: '3.5em',
            color: theme === 'light' ? 'rgba(0,0,0,0.92)' : 'rgba(255,255,255,0.92)',
            textShadow: theme === 'light' 
              ? '0 2px 12px rgba(255,255,255,0.8), 0 1px 0 rgba(255,255,255,0.5)'
              : '0 2px 12px rgba(0,0,0,0.32), 0 1px 0 #fff2',
          }}
        >
          {showTyped && (
            <ReactTyped
              strings={[
                "I am a full-stack developer from Prince Edward Island, Canada.", 
                "Crafting modern web experiences.", 
                "Full-stack development with a creative edge.", 
                "Bridging design and engineering.", 
                "From backend logic to front-end magic."
              ]}
              typeSpeed={40}
              backSpeed={25}
              backDelay={2200}
              loop
              showCursor
              cursorChar="_"
            />
          )}
        </div>
      </div>

      {/* Pixel Screen Overlay - now covers headings and buttons */}
      <div
        className="pixel-overlay absolute inset-0 pointer-events-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1.6s cubic-bezier(0.4,0,0.2,1)',
        }}
      ></div>
    </section>
  )
}
