"use client";

import { useEffect, useState } from "react"
import { ReactTyped } from "react-typed"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"

// Lazy load the 3D background
const ThreeWaveBackground = dynamic(
  () => import("./three-wave-background").then((m) => m.ThreeWaveBackground),
  { ssr: false }
)

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTyped, setShowTyped] = useState(false)
  const { theme } = useTheme()

  // Choose gradient for animated text based on theme
  const animatedGradient = theme === 'light'
    ? 'linear-gradient(270deg, #0ea5e9, #f59e42, #f43f5e, #a21caf, #22c55e, #eab308, #0ea5e9)'
    : 'linear-gradient(270deg, #6EE7B7, #3B82F6, #A78BFA, #F472B6, #FDE68A, #6EE7B7)';

  // Fade in effects
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

  // Inject keyframes
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

  return (
    <section className="layout min-h-screen flex flex-col justify-between relative" style={{height: '100%'}}>
      {/* Three.js background with fade-in */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1.6s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <ThreeWaveBackground />
      </div>

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

      {/* Pixel Screen Overlay */}
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
