"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, Linkedin, Mail, GitMerge, Container } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [headerText, setHeaderText] = useState("craw.ca")
  const [showMapleLeaf, setShowMapleLeaf] = useState(true)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname
      const isCmacrowther = hostname === "cmacrowther.com"
      setHeaderText(isCmacrowther ? "Colin Crowther" : "craw.ca")
      setShowMapleLeaf(!isCmacrowther)
    }
  }, [])

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-white/10 dark:bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-white/10 dark:supports-[backdrop-filter]:bg-black/10 shadow-lg shadow-black/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="text-xl font-heading font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              {headerText}
              {showMapleLeaf && (
                <span 
                  className="text-xl inline-block"
                  style={{
                    filter: 'hue-rotate(0deg) saturate(0) brightness(0) invert(18%) sepia(100%) saturate(7482%) hue-rotate(3deg) brightness(97%) contrast(118%)'
                  }}
                >
                  🍁
                </span>
              )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/cmacrowther" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://gitlab.com/cmacrowther" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                <GitMerge className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/colincrowther/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
            </a>
            <a href="https://hub.docker.com/u/cmacrowther" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                <Container className="h-4 w-4" />
              </Button>
            </a>
            <a href="mailto:hello@cmacrowther.com">
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border/20 bg-white/5 dark:bg-black/5 backdrop-blur-sm">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-body font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-2 px-3 py-2">
                <a href="https://github.com/cmacrowther" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm">
                    <Github className="h-4 w-4" />
                  </Button>
                </a>
                <a href="https://gitlab.com/cmacrowther" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm">
                    <GitMerge className="h-4 w-4" />
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/colincrowther/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </a>
                <a href="https://hub.docker.com/u/cmacrowther" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm">
                    <Container className="h-4 w-4" />
                  </Button>
                </a>
                <a href="mailto:hello@cmacrowther.com">
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
