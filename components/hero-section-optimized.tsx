"use client";

import { useEffect, useState } from "react"
import { ReactTyped } from "react-typed"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { lazyComponent } from "./lazy-load-wrapper"

// Lazy load Three.js to reduce initial bundle size
const ThreeBackground = lazyComponent(
  () => import('./three-background').then(m => ({ default: m.ThreeBackground })),
  <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted animate-pulse" />
)

export function HeroSection() {
  const [isClient, setIsClient] = useState(false)

  // Only render Three.js on client side and after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized background with reduced motion preference support */}
      {isClient && (
        <div className="absolute inset-0">
          <ThreeBackground />
        </div>
      )}
      
      {/* Fallback gradient for non-JS or reduced motion */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Name and title with optimized animations */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk">
              <span className="block">Colin</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Crowther
              </span>
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-dm-sans">
              <ReactTyped
                strings={[
                  "Full Stack Developer",
                  "Software Engineer", 
                  "Technology Enthusiast",
                  "Problem Solver"
                ]}
                typeSpeed={50}
                backSpeed={30}
                backDelay={2000}
                loop
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building modern web applications with cutting-edge technologies. 
            Passionate about creating seamless user experiences and scalable solutions.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
