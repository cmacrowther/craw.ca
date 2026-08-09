"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation-optimized";
import { useLowEndDevice } from "@/hooks/use-low-end-device";
import { type ProjectCardData, type ProjectFilter, projectCategories } from "@/lib/projects";

import { LazyLoadWrapper } from "./lazy-load-wrapper";
import { ProjectShowcaseCard } from "./project-showcase-card";

type ProjectsSectionProps = {
  projects: ProjectCardData[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectFilter>("all");
  const { isLowEnd } = useLowEndDevice();

  const headerRef = useScrollAnimation({ delay: 100, stagger: 30 });
  const filtersRef = useScrollAnimation({ delay: 200, stagger: 50 });
  const gridRef = useStaggeredAnimation({
    delay: 300,
    stagger: 150,
    childSelector: "[data-stagger]",
  });

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects
        .filter((project) => project.categories.includes(selectedCategory))
        .sort(
          (a, b) =>
            Number(b.highlightCategories?.includes(selectedCategory) ?? false) -
            Number(a.highlightCategories?.includes(selectedCategory) ?? false),
        );

  return (
    <LazyLoadWrapper minHeight="400px">
      <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div ref={headerRef} className="mb-16 text-center">
            <span className="animate-fade-down mb-4 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium tracking-[0.01em] text-black shadow-lg shadow-black/20">
              Portfolio Showcase
            </span>

            <h2 data-animate className="mb-4 pixel-mask-text text-3xl font-heading font-[650] sm:text-4xl lg:text-5xl">
              Featured Work
            </h2>
            <p data-animate className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
              Explore my latest hobby projects. Open any card to step into its own detail page.
            </p>
          </div>

          <div ref={filtersRef} className="mb-16 flex flex-wrap justify-center gap-2">
            {projectCategories.map((category, index) => (
              <Button
                key={category.id}
                data-animate
                variant={selectedCategory === category.id ? "default" : "outline"}
                aria-pressed={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full px-6 py-2 transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms`, borderWidth: 0 }}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div ref={gridRef} className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectShowcaseCard
                  key={project.id}
                  project={project}
                  priority={index === 0}
                  highlighted={project.highlightCategories?.includes(selectedCategory) ?? false}
                  stagger
                  index={index}
                  isLowEnd={isLowEnd}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyLoadWrapper>
  );
}
