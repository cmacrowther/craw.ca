import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProjectsSection } from "@/components/projects-section";
import { projectsByReleaseDate, type ProjectCardData } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Colin Crowther",
  description: "Browse Colin Crowther's complete collection of web applications, tools, games, and creative projects.",
  alternates: { canonical: "/projects" },
};

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
