"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, Linkedin, Mail, Container } from "lucide-react"
import GitLab from "@/components/ui/gitlab-icon"

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "Projects", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
]

export function HeaderMobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <div className="md:hidden flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mobile-menu-animate">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border/20 bg-white/5 dark:bg-black/5 backdrop-blur-sm">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="site-link-muted block px-3 py-2 text-base font-body font-medium tracking-[0.01em] mobile-nav-item"
                onClick={() => setIsMenuOpen(false)}
                style={{ "--mobile-delay": `${index * 0.1}s` } as React.CSSProperties}
              >
                {item.name}
              </Link>
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
    </>
  )
}
