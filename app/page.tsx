import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section-fast"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { LazyLoadWrapper } from "@/components/lazy-load-wrapper"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LazyLoadWrapper minHeight="600px">
          <ProjectsSection />
        </LazyLoadWrapper>
        <LazyLoadWrapper minHeight="500px">
          <AboutSection />
        </LazyLoadWrapper>
        <LazyLoadWrapper minHeight="400px">
          <ContactSection />
        </LazyLoadWrapper>
      </main>
      <Footer />
    </div>
  )
}
