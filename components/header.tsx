import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FaLinkedin } from "react-icons/fa"
import { HiMail } from "react-icons/hi"
import { SiDocker, SiGithub, SiGitlab } from "react-icons/si"
import { HeaderMobileMenu } from "./header-mobile-menu"

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "Projects", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-white/10 dark:bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-white/10 dark:supports-[backdrop-filter]:bg-black/10 shadow-lg shadow-black/5 header-entrance">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:grid md:grid-cols-3 md:justify-items-stretch">
          {/* Logo */}
          <div className="flex justify-start">
            <Link
              href="/#home"
              className="site-link text-xl font-heading font-[650] flex items-center gap-2"
              style={{ position: "relative" }}
            >
              <span className="header-text-only flex items-center gap-1">
                <Badge
                  variant="outline"
                  className="text-sm px-5 py-1.5 rounded-full shadow-md bg-white/80 border-white/30 text-white/90 backdrop-blur-sm tracking-wide"
                >
                </Badge>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="site-link-muted text-sm font-body font-medium tracking-[0.01em]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center justify-end">
            <div className="hidden md:flex items-center space-x-4">
              <a href="https://github.com/cmacrowther" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm">
                  <SiGithub className="size-4" />
                </Button>
              </a>
              <a href="https://gitlab.com/cmacrowther" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm">
                  <SiGitlab className="size-4" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/colincrowther/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm">
                  <FaLinkedin className="size-4" />
                </Button>
              </a>
              <a href="https://hub.docker.com/u/cmacrowther" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm">
                  <SiDocker className="size-4" />
                </Button>
              </a>
              <a href="mailto:hello@cmacrowther.com">
                <Button variant="ghost" size="sm">
                  <HiMail className="size-4" />
                </Button>
              </a>
            </div>

            <HeaderMobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
