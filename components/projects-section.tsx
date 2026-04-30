"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation-optimized";
import { getProjectsForFilter, isProjectHighlightedForFilter, projectCategories } from "@/lib/projects";

import { LazyLoadWrapper } from "./lazy-load-wrapper";
import { ProjectShowcaseCard } from "./project-showcase-card";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof projectCategories)[number]["id"]>("all");

  const headerRef = useScrollAnimation({ delay: 100, stagger: 30 });
  const filtersRef = useScrollAnimation({ delay: 200, stagger: 50 });
  const gridRef = useStaggeredAnimation({
    delay: 300,
    stagger: 150,
    childSelector: "[data-stagger]",
  });

  const filteredProjects = getProjectsForFilter(selectedCategory);

  return (
    <LazyLoadWrapper minHeight="400px">
      <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div ref={headerRef} className="mb-16 text-center">
            <span
              className="animate-fade-down relative mb-4 inline-flex items-center overflow-hidden rounded-full px-4 py-2 text-sm font-medium text-white"
              style={{
                backgroundImage: "linear-gradient(135deg, #a78bfa 0%, #ec4899 25%, #8b5cf6 50%, #06b6d4 75%, #10b981 100%)",
                backgroundSize: "300% 300%",
                animation: "gradient-xy 4s ease-in-out infinite",
              }}
            >
              <svg className="mr-2 h-4 w-4 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Portfolio Showcase
            </span>

            <h2 data-animate className="mb-4 pixel-mask-text text-3xl font-heading font-bold sm:text-4xl lg:text-5xl">
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
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full px-6 py-2 transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
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
                  highlighted={isProjectHighlightedForFilter(project, selectedCategory)}
                  stagger
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyLoadWrapper>
  );
}
