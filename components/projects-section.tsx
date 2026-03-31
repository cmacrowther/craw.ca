"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation-optimized";
import { distributionLabels, projectCategories, projectStateLabels, projectsByReleaseDate } from "@/lib/projects";

import { LazyLoadWrapper } from "./lazy-load-wrapper";
import { OptimizedImage } from "./optimized-image";
import { OptimizedVideo } from "./optimized-video";

function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof projectCategories)[number]["id"]>("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const headerRef = useScrollAnimation({ delay: 100, stagger: 30 });
  const filtersRef = useScrollAnimation({ delay: 200, stagger: 50 });
  const gridRef = useStaggeredAnimation({
    delay: 300,
    stagger: 150,
    childSelector: "[data-stagger]",
  });

  const filteredProjects =
    selectedCategory === "all"
      ? projectsByReleaseDate
      : projectsByReleaseDate.filter((project) => project.categories.includes(selectedCategory));

  return (
    <LazyLoadWrapper minHeight="400px">
      <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div ref={headerRef} className="mb-16 text-center">
            <span
              className="animate-fade-down relative mb-4 inline-flex items-center overflow-hidden rounded-full px-4 py-2 text-sm font-medium text-white"
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 25%, #8b5cf6 50%, #06b6d4 75%, #10b981 100%)",
                backgroundSize: "300% 300%",
                animation: "gradient-xy 4s ease-in-out infinite",
              }}
            >
              <svg className="mr-2 h-4 w-4 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Portfolio Showcase
            </span>

            <h2 data-animate className="mb-4 text-3xl font-heading font-bold sm:text-4xl lg:text-5xl">
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
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  data-stagger
                  href={`/projects/${project.slug}`}
                  aria-label={`Open ${project.title} project page`}
                  className="group relative block h-[400px] overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4"
                  style={{
                    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
                    willChange: "transform",
                  }}
                >
                  <div className="absolute inset-0 h-full w-full" style={{ transform: "translateZ(0)", willChange: "transform" }}>
                    {project.video && !isMobile ? (
                      <>
                        <OptimizedVideo
                          src={project.video}
                          poster={project.image || "/placeholder.jpg"}
                          alt={project.title}
                          autoPlay
                          loop
                          muted
                          preload="metadata"
                          className="h-full w-full object-cover"
                          quality="medium"
                        />
                        <div className="pixel-overlay pointer-events-none h-full w-full rounded-3xl" style={{ borderRadius: "inherit" }} />
                      </>
                    ) : (
                      <OptimizedImage
                        src={project.image || "/placeholder.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        quality={75}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={project.id === 1}
                      />
                    )}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[100%] rounded-b-3xl"
                      style={{
                        background: `linear-gradient(to top, rgba(2,6,23,0.97) 0%, rgba(2,6,23,0.92) 16%, rgba(2,6,23,0.76) 32%, rgba(2,6,23,0.34) 58%, rgba(2,6,23,0.00) 100%), ${project.accent.spotlight}`,
                        backgroundPosition: "center bottom, center 120%",
                        backgroundSize: "100% 100%, 145% 145%",
                        backgroundRepeat: "no-repeat",
                        willChange: "opacity",
                      }}
                    />
                  </div>

                  <div className="relative z-20 h-full p-6">

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="mb-4">
                        <h3
                          className="text-xl font-bold text-white transition-colors md:text-2xl"
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            lineHeight: "1.2",
                          }}
                        >
                          {project.title}
                        </h3>

                        <p
                          className="text-sm leading-relaxed text-white/80"
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            lineHeight: "1.25rem",
                          }}
                        >
                          {project.shortDescription}
                        </p>
                      </div>

                      <div className="mb-3 flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="border border-white/20 bg-white/20 text-xs text-white/90 backdrop-blur-sm">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="border-white/30 bg-white/10 text-xs text-white/80 backdrop-blur-sm">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-white/30 bg-white/10 text-xs text-white/85 backdrop-blur-sm">
                          {project.releaseDate}
                        </Badge>
                        <Badge variant="outline" className="border-white/30 bg-white/10 text-xs text-white/85 backdrop-blur-sm">
                          {projectStateLabels[project.projectState]}
                        </Badge>
                        <Badge variant="outline" className="border-white/30 bg-white/10 text-xs text-white/85 backdrop-blur-sm">
                          {distributionLabels[project.distribution]}
                        </Badge>
                      </div>
                    </div>

                    <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/20 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyLoadWrapper>
  );
}
