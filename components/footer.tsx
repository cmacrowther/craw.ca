import Link from "next/link"
import { Github, Linkedin, Mail, Heart, Container } from "lucide-react"
import GitLab from "@/components/ui/gitlab-icon"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 dark:bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-[600]">Colin Crowther</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              I am a full-stack developer from Prince Edward Island, Canada. I specialize in creating digital experiences that make a difference, with a focus on performance, accessibility, and user experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-heading font-[600] uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/#home" className="font-body text-sm site-link-muted">
                Home
              </Link>
              <Link
                href="/#projects"
                className="font-body text-sm site-link-muted"
              >
                Projects
              </Link>
              <Link href="/#about" className="font-body text-sm site-link-muted">
                About
              </Link>
              <Link
                href="/#contact"
                className="font-body text-sm site-link-muted"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-heading font-[600] uppercase tracking-wider">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/cmacrowther"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link-muted"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://gitlab.com/cmacrowther"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link-muted"
              >
                <GitLab className="h-5 w-5" />
                <span className="sr-only">GitLab</span>
              </a>
              <a
                href="https://www.linkedin.com/in/colincrowther/"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link-muted"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://hub.docker.com/u/cmacrowther"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link-muted"
              >
                <Container className="h-5 w-5" />
                <span className="sr-only">Docker Hub</span>
              </a>
              <a
                href="mailto:hello@cmacrowther.com"
                className="site-link-muted"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="font-body text-sm text-muted-foreground">
              © {new Date().getFullYear()} Colin Crowther. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
