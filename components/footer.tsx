import { Github, Linkedin, Mail, Heart, GitMerge, Container } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 dark:md:bg-muted/30 dark:bg-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Colin Crowther</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              I am a full-stack developer from Prince Edward Island, Canada. I specialize in creating digital experiences that make a difference, with a focus on performance, accessibility, and user experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-heading font-semibold uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a
                href="#projects"
                className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a href="#about" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a
                href="#contact"
                className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-heading font-semibold uppercase tracking-wider">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/cmacrowther"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://gitlab.com/cmacrowther"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <GitMerge className="h-5 w-5" />
                <span className="sr-only">GitLab</span>
              </a>
              <a
                href="https://www.linkedin.com/in/colincrowther/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://hub.docker.com/u/cmacrowther"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Container className="h-5 w-5" />
                <span className="sr-only">Docker Hub</span>
              </a>
              <a
                href="mailto:hello@cmacrowther.com"
                className="text-muted-foreground hover:text-primary transition-colors"
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
            <p className="font-body text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> using Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
