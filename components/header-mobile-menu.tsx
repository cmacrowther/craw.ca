"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import { SiDocker, SiGithub, SiGitlab } from "react-icons/si"

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "Projects", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
]

export function HeaderMobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return

    const originalOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [isMenuOpen])

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
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] flex min-h-[100dvh] flex-col bg-[#111]/98 px-6 py-5 text-white backdrop-blur-xl md:hidden mobile-menu-animate"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="pixel-overlay" aria-hidden="true" />
          <div className="relative z-10 flex flex-1 flex-col">
            <div className="flex items-center justify-between">
              <Link href="/#home" className="site-link text-lg font-heading font-[650]" onClick={() => setIsMenuOpen(false)}>
                CRAW
              </Link>
              <Button variant="ghost" size="icon" aria-label="Close menu" autoFocus onClick={() => setIsMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex flex-1 flex-col justify-center" aria-label="Mobile navigation">
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="site-link-muted block py-3 text-4xl font-heading font-medium tracking-tight mobile-nav-item"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ "--mobile-delay": `${index * 0.1}s` } as React.CSSProperties}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="flex items-center gap-2 border-t border-white/15 pt-5 mobile-actions">
              <a href="https://github.com/cmacrowther" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="mobile-action-icon">
                <Button variant="ghost" size="sm"><SiGithub className="size-4" /></Button>
              </a>
              <a href="https://gitlab.com/cmacrowther" target="_blank" rel="noopener noreferrer" aria-label="GitLab" className="mobile-action-icon">
                <Button variant="ghost" size="sm"><SiGitlab className="size-4" /></Button>
              </a>
              <a href="https://www.linkedin.com/in/colincrowther/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="mobile-action-icon">
                <Button variant="ghost" size="sm"><FaLinkedin className="size-4" /></Button>
              </a>
              <a href="https://hub.docker.com/u/cmacrowther" target="_blank" rel="noopener noreferrer" aria-label="Docker Hub" className="mobile-action-icon">
                <Button variant="ghost" size="sm"><SiDocker className="size-4" /></Button>
              </a>
              <a href="mailto:hello@cmacrowther.com" aria-label="Email" className="mobile-action-icon">
                <Button variant="ghost" size="sm"><HiOutlineMail className="size-4" /></Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
