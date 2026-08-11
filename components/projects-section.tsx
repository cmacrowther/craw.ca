"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation-optimized";
import { useLowEndDevice } from "@/hooks/use-low-end-device";
import {
  featuredProjectSlugs,
  type ProjectCardData,
  type ProjectFilter,
  projectCategories,
} from "@/lib/projects";

import { LazyLoadWrapper } from "./lazy-load-wrapper";
import { ProjectShowcaseCard } from "./project-showcase-card";

type ProjectsSectionProps = {
  projects: ProjectCardData[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProjectFilter>("all");
  const { isLowEnd } = useLowEndDevice();

  const headerRef = useScrollAnimation({ delay: 100, stagger: 30 });
  const featuredGridRef = useStaggeredAnimation({
    delay: 300,
    stagger: 150,
    childSelector: "[data-stagger]",
  });

  const featuredProjects = featuredProjectSlugs.reduce<ProjectCardData[]>((result, slug) => {
    const project = projects.find((candidate) => candidate.slug === slug);

    if (project) {
      result.push(project);
    }

    return result;
  }, []);
  const featuredProjectSlugsSet = new Set<string>(featuredProjectSlugs);
  const otherProjects = projects.filter((project) => !featuredProjectSlugsSet.has(project.slug));
  const filteredOtherProjects = selectedCategory === "all"
    ? otherProjects
    : otherProjects
        .filter((project) => project.categories.includes(selectedCategory))
        .sort(
          (a, b) =>
            Number(b.highlightCategories?.includes(selectedCategory) ?? false) -
            Number(a.highlightCategories?.includes(selectedCategory) ?? false),
        );

  return (
    <LazyLoadWrapper minHeight="400px">
      <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="container mx-auto max-w-7xl">
          <div ref={headerRef} className="mb-14 max-w-3xl sm:mb-20">
            <span className="animate-fade-down mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 shadow-lg shadow-black/20 backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              Selected work
            </span>

            <h2 data-animate className="mb-5 pixel-mask-text text-4xl font-heading font-[650] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
              Projects<br className="hidden sm:block" /> built to be used.
            </h2>
            <p data-animate className="max-w-xl font-body text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Three ambitious products spanning real-time AI video, social media, and local-first software.
            </p>
          </div>

          <div ref={featuredGridRef} className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <ProjectShowcaseCard
                  key={project.id}
                  project={project}
                  priority
                  featured
                  featureNumber={index + 1}
                  stagger
                  index={index}
                  isLowEnd={isLowEnd}
                  className={index === 0 ? "lg:col-span-2" : ""}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10">
            {!showMoreProjects ? (
              <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  More experiments, games, and open-source tools are waiting in the complete project archive.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  aria-expanded={false}
                  aria-controls="more-projects"
                  onClick={() => setShowMoreProjects(true)}
                  className="rounded-full border-white/25 bg-white/[0.04] px-6 text-white hover:bg-white hover:text-black"
                >
                  See more projects
                  <ChevronDown className="size-4" />
                </Button>
              </div>
            ) : (
              <div id="more-projects" className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                <div className="mb-9 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">Project archive</p>
                    <h3 className="text-2xl font-heading font-[650] tracking-[-0.03em] text-white sm:text-3xl">More things I&apos;ve made</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {projectCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        aria-pressed={selectedCategory === category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className="h-8 rounded-full px-4 text-xs"
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredOtherProjects.map((project, index) => (
                    <ProjectShowcaseCard
                      key={project.id}
                      project={project}
                      priority={false}
                      highlighted={project.highlightCategories?.includes(selectedCategory) ?? false}
                      index={index}
                      isLowEnd={isLowEnd}
                    />
                  ))}
                </div>

                {filteredOtherProjects.length === 0 && (
                  <p className="py-12 text-center text-muted-foreground">No archived projects match that category yet.</p>
                )}

                <div className="mt-10 flex justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    aria-expanded
                    aria-controls="more-projects"
                    onClick={() => setShowMoreProjects(false)}
                    className="rounded-full px-5 text-white/75 hover:text-white"
                  >
                    Show featured projects only
                    <ChevronUp className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </LazyLoadWrapper>
  );
}
