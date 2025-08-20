"use client";

import { useEffect, useRef } from "react"
import { ReactTyped } from "react-typed"
import { useTheme } from "next-themes"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
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
    if (!threeRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationId: number;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let particles: THREE.Mesh[] = [];
    let count = 0;
    
    // Optimized particle counts for better performance
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

    const width = Math.min(window.innerWidth, 1920);
    const height = Math.min(window.innerHeight, 1080);
    
    camera = new THREE.PerspectiveCamera(100, width / height, 1, 10000);
    camera.position.y = 400;
    camera.position.z = 50;
    camera.rotation.y = 0.1;
    scene = new THREE.Scene();
    
    let i = 0;
    // Simpler geometry for better performance
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
    
    renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(backgroundColor, 1);
    threeRef.current.appendChild(renderer.domElement);

    // Optimized mouse events
    const handleMouseMove = (e: MouseEvent) => {
      if (!threeRef.current) return;
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

    // Throttled scroll handler
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

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optimized animation loop
    let lastTime = 0;
    const targetFPS = 30;
    const fpsInterval = 1000 / targetFPS;
    
    function render(currentTime: number) {
      animationId = requestAnimationFrame(render);
      
      if (currentTime - lastTime < fpsInterval) return;
      lastTime = currentTime - ((currentTime - lastTime) % fpsInterval);

      // Smooth mouse following
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.05;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.05;
      mouseX = smoothMouseX * 400;
      mouseY = smoothMouseY * 400;

      // Update camera FOV
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
      
      geometry.dispose();
      particles.forEach(particle => {
        if (particle.material instanceof THREE.Material) {
          particle.material.dispose();
        }
      });
      particles = [];
    };
  }, [theme]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js background */}
      <div ref={threeRef} className="absolute inset-0 z-0" />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-background/30 z-5" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Name and title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk">
              <span className="block">Hi, my name is</span>
              <span className="block" style={{
                background: theme === 'light' ? 'linear-gradient(45deg, #4F46E5, #7C3AED, #EC4899)' : 'linear-gradient(45deg, #60A5FA, #A78BFA, #F472B6)',
                backgroundSize: '400% 400%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientMove 4s ease-in-out infinite'
              }}>
                Colin
              </span>
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-dm-sans">
              <ReactTyped
                strings={[
                  "I am a full-stack developer from Prince Edward Island, Canada.",
                  "Crafting modern web experiences.",
                  "Full-stack development with a creative edge.",
                  "Bridging design and engineering. One pixel at a time.",
                  "From backend logic to front-end magic."
                ]}
                typeSpeed={40}
                backSpeed={25}
                backDelay={2200}
                loop
                showCursor
                cursorChar="_"
              />
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button size="lg" className="group" asChild>
              <a href="#projects" className="flex items-center gap-2">
                View My Work
                <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" asChild>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a 
                  href="mailto:contact@example.com"
                  aria-label="Email Contact"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
