import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section-fast"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"
import { DeferredHomeSection } from "@/components/deferred-home-section"
import { projectsByReleaseDate, type ProjectCardData } from "@/lib/projects"

const projectCards: ProjectCardData[] = projectsByReleaseDate.map((project) => ({
  id: project.id,
  slug: project.slug,
  title: project.title,
  logo: project.logo,
  logoCardClassName: project.logoCardClassName,
  shortDescription: project.shortDescription,
  image: project.image,
  video: project.video,
  technologies: project.technologies,
  categories: project.categories,
  highlightCategories: project.highlightCategories,
  accent: project.accent,
}))

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection projects={projectCards} />
        <DeferredHomeSection section="about" minHeight={1100} />
        <DeferredHomeSection section="contact" minHeight={800} />
      </main>
      <Footer />
    </div>
  )
}
