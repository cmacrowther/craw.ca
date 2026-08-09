"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { type ProjectCardData } from "@/lib/projects";

import { OptimizedImage } from "./optimized-image";
import { OptimizedVideo } from "./optimized-video";

type ProjectShowcaseCardProps = {
  project: ProjectCardData;
  priority?: boolean;
  stagger?: boolean;
  highlighted?: boolean;
  className?: string;
  /**
   * Position of the card within the grid; used to stagger video autoplay so
   * the browser does not decode every video simultaneously on slow devices.
   */
  index?: number;
  isLowEnd?: boolean;
};

export function ProjectShowcaseCard({
  project,
  priority = false,
  stagger = false,
  highlighted = false,
  className = "",
  index = 0,
  isLowEnd = false,
}: ProjectShowcaseCardProps) {
  // Capable devices: ~250ms per slot (grid lights up over ~2s).
  // Low-end devices: ~600ms per slot to keep simultaneous decoders to ~1–2.
  const perCardMs = isLowEnd ? 600 : 250;
  const autoPlayDelayMs = index * perCardMs;

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-stagger={stagger ? true : undefined}
      aria-label={`Open ${project.title} project page`}
      className={`group relative block h-[400px] overflow-hidden rounded-3xl transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 ${className}`.trim()}
      style={{
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
        borderInline: "1px solid #111111",
      }}
    >
      <div className="absolute inset-0 h-full w-full">
        {project.video ? (
          <>
            <OptimizedVideo
              src={project.video}
              poster={project.image}
              alt={project.title}
              autoPlay
              loop
              muted
              preload="metadata"
              className="h-full w-full object-cover"
              quality="medium"
              autoPlayDelay={autoPlayDelayMs}
              releaseOnExit
            />
            <div className="pixel-overlay pointer-events-none h-full w-full" style={{ borderRadius: "inherit" }} />
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
            priority={priority}
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[100%]"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.88) 16%, rgba(0,0,0,0.68) 32%, rgba(0,0,0,0.26) 58%, rgba(0,0,0,0.00) 100%), ${project.accent.surfaceGradient}`,
            backgroundPosition: "center bottom",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="relative z-20 h-full p-6">
        {highlighted && (
          <div
            className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg"
            style={{ background: project.accent.badgeGradient }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Highlight
          </div>
        )}

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
        </div>

        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/20 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>
      </div>
    </Link>
  );
}
