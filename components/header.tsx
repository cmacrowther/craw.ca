"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, Linkedin, Mail, Container, Laptop2 } from "lucide-react"
import GitLab from "@/components/ui/gitlab-icon"
import { GradientLaptopIcon } from "@/components/ui/gradient-laptop-icon"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isLaptopAnimating, setIsLaptopAnimating] = useState(false)

  // Periodically animate the laptop icon
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLaptopAnimating(true)
      setTimeout(() => setIsLaptopAnimating(false), 1000)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [headerText, setHeaderText] = useState("craw.ca")
  const headerTextRef = useRef<HTMLAnchorElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname
      const isCmacrowther = hostname === "cmacrowther.com" || hostname === "www.cmacrowther.com"
      console.log("Header: Detected hostname:", hostname, "| isCmacrowther:", isCmacrowther)
      setHeaderText(isCmacrowther ? "cmacrowther.com" : "craw.ca")
    }
  }, [])

  useEffect(() => {
    // Initialize splitting.js animations
    const timer = setTimeout(() => {
      // Dynamically import Splitting only on client side
      import('splitting').then((module) => {
        const Splitting = module.default;
        
        // Animate header text first
        if (headerTextRef.current && headerText) {
          headerTextRef.current.classList.remove('header-logo-hidden')
          headerTextRef.current.classList.add('header-logo-visible')
          
          // Target only the text span for splitting.js
          const textSpan = headerTextRef.current.querySelector('.header-text-only')
          if (textSpan) {
            Splitting({
              target: textSpan,
              by: 'chars'
            })
            
            requestAnimationFrame(() => {
              textSpan.classList.add('splitting-animation')
            })
          }
        }

        // Animate navigation links after a delay
        setTimeout(() => {
          if (navRef.current) {
            navRef.current.classList.remove('nav-hidden')
            navRef.current.classList.add('nav-visible')
            
            const navLinks = navRef.current.querySelectorAll('a')
            navLinks.forEach((link, index) => {
              link.classList.remove('nav-item-hidden')
              link.classList.add('nav-item-visible')
              
              Splitting({
                target: link,
                by: 'chars'
              })
              
              requestAnimationFrame(() => {
                link.classList.add('splitting-animation-nav')
                link.style.setProperty('--nav-delay', `${index * 0.15}s`)
              })
            })
          }
        }, 500) // Start nav animation after 500ms

        // Animate action buttons last
        setTimeout(() => {
          if (actionsRef.current) {
            actionsRef.current.classList.remove('actions-hidden')
            actionsRef.current.classList.add('actions-visible')
            
            // Don't use splitting.js on icons - just animate them directly
            const actionIcons = actionsRef.current.querySelectorAll('.action-icon')
            actionIcons.forEach((icon, index) => {
              if (icon instanceof HTMLElement) {
                icon.classList.add('action-icon-animate')
                icon.style.setProperty('--action-delay', `${index * 0.1}s`)
              }
            })
          }

          // Animate mobile controls at the same time as desktop actions
          if (typeof document !== 'undefined') {
            const mobileControls = document.querySelector('.mobile-controls-hidden')
            if (mobileControls instanceof HTMLElement) {
              mobileControls.classList.remove('mobile-controls-hidden')
              mobileControls.classList.add('mobile-controls-visible')
            }
          }
        }, 1000) // Start action buttons after 1000ms
      }).catch(() => {
        // Fallback animation without splitting.js if it fails to load
        console.warn('Splitting.js failed to load - using fallback animations');
        
        // Still run basic animations even if splitting fails
        if (headerTextRef.current && headerText) {
          headerTextRef.current.classList.remove('header-logo-hidden')
          headerTextRef.current.classList.add('header-logo-visible')
        }
        
        if (navRef.current) {
          navRef.current.classList.remove('nav-hidden')
          navRef.current.classList.add('nav-visible')
        }
        
        if (actionsRef.current) {
          actionsRef.current.classList.remove('actions-hidden')
          actionsRef.current.classList.add('actions-visible')
        }
      })
    }, 300) // Initial delay to ensure everything is rendered

    return () => clearTimeout(timer)
  }, [headerText])

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-white/10 dark:bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-white/10 dark:supports-[backdrop-filter]:bg-black/10 shadow-lg shadow-black/5 header-entrance">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:grid md:grid-cols-3 md:justify-items-stretch">
          {/* Logo - Shared between mobile and desktop */}
          <div className="flex justify-start">
            <a
              ref={headerTextRef}
              href="#home"
              className="text-xl font-heading font-bold text-foreground hover:text-foreground transition-colors flex items-center gap-2 header-logo-hidden"
              style={{ position: 'relative' }}
            >
              <span className="header-text-only flex items-center gap-1">
                <GradientLaptopIcon
                  className={`laptop-code-icon splitting-animatable ${isLaptopAnimating ? 'laptop-animate' : ''}`}
                  style={{
                    transition: 'transform 0.4s cubic-bezier(.68,-0.55,.27,1.55)',
                    transform: isLaptopAnimating ? 'scale(1.2) rotate(-10deg)' : 'scale(1) rotate(0deg)',
                    marginRight: '0.35em',
                    verticalAlign: 'middle',
                  }}
                  size={22}
                  strokeWidth={2.2}
                  aria-label="Laptop coding icon"
                />
                <span>{headerText}</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation - Center Column (hidden on mobile) */}
          <nav ref={navRef} className="hidden md:flex items-center justify-center nav-hidden">
            <div className="flex items-center space-x-8">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors nav-item-hidden"
                  style={{ '--nav-index': index } as React.CSSProperties}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          {/* Actions and Mobile Menu */}
          <div className="flex items-center justify-end">
            {/* Desktop Actions */}
            <div ref={actionsRef} className="hidden md:flex items-center space-x-4 actions-hidden">
            <a href="https://github.com/cmacrowther" target="_blank" rel="noopener noreferrer" className="action-icon">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://gitlab.com/cmacrowther" target="_blank" rel="noopener noreferrer" className="action-icon">
              <Button variant="ghost" size="sm">
                <GitLab className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/colincrowther/" target="_blank" rel="noopener noreferrer" className="action-icon">
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://hub.docker.com/u/cmacrowther" target="_blank" rel="noopener noreferrer" className="action-icon">
              <Button variant="ghost" size="sm">
                <Container className="h-4 w-4" />
              </Button>
            </a>
            <a href="mailto:hello@cmacrowther.com" className="action-icon">
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </a>
            <div className="action-icon">
              <ThemeToggle />
            </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2 mobile-controls-hidden">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mobile-menu-animate">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border/20 bg-white/5 dark:bg-black/5 backdrop-blur-sm">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-body font-medium text-muted-foreground hover:text-foreground transition-colors mobile-nav-item"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ '--mobile-delay': `${index * 0.1}s` } as React.CSSProperties}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-2 px-3 py-2 mobile-actions">
                <a href="https://github.com/cmacrowther" target="_blank" rel="noopener noreferrer" className="mobile-action-icon">
                  <Button variant="ghost" size="sm">
                    <Github className="h-4 w-4" />
                  </Button>
                </a>
                <a href="https://gitlab.com/cmacrowther" target="_blank" rel="noopener noreferrer" className="mobile-action-icon">
                  <Button variant="ghost" size="sm">
                    <GitLab className="h-4 w-4" />
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/colincrowther/" target="_blank" rel="noopener noreferrer" className="mobile-action-icon">
                  <Button variant="ghost" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </a>
                <a href="https://hub.docker.com/u/cmacrowther" target="_blank" rel="noopener noreferrer" className="mobile-action-icon">
                  <Button variant="ghost" size="sm">
                    <Container className="h-4 w-4" />
                  </Button>
                </a>
                <a href="mailto:hello@cmacrowther.com" className="mobile-action-icon">
                  <Button variant="ghost" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
