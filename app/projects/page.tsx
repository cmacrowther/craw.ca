import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProjectsSection } from "@/components/projects-section";
import { projectsByReleaseDate, type ProjectCardData } from "@/lib/projects";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Selected Work",
  description:
    "Explore Colin Crowther's web apps, developer tools, games, and digital experiments—built with equal care for the code and the experience.",
  path: "/projects",
  imageAlt: "Selected work by Colin Crowther",
});

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
}));

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProjectsSection projects={projectCards} showAllProjects />
      </main>
      <Footer />
    </div>
  );
}
