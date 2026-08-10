"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { type ProjectCardData } from "@/lib/projects";

import { OptimizedImage } from "./optimized-image";
import { OptimizedVideo } from "./optimized-video";

type ProjectShowcaseCardProps = {
  project: ProjectCardData;
  priority?: boolean;
  stagger?: boolean;
  highlighted?: boolean;
  featured?: boolean;
  featureNumber?: number;
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
  featured = false,
  featureNumber,
  className = "",
  index = 0,
  isLowEnd = false,
}: ProjectShowcaseCardProps) {
  // Keep the player itself out of the tree until the card is approaching the
  // viewport. `preload="none"` alone still mounts a video element for every
  // project card, while this prevents any video initialization off-screen.
  const { ref: mediaRef, isNearViewport } = useNearViewport<HTMLDivElement>("400px");

  // Capable devices: ~250ms per slot (grid lights up over ~2s).
  // Low-end devices: ~600ms per slot to keep simultaneous decoders to ~1–2.
  const perCardMs = isLowEnd ? 600 : 250;
  const autoPlayDelayMs = index * perCardMs;
  const featuredTitleClass = featured
    ? "h-16 text-3xl sm:h-20 sm:text-4xl md:text-5xl"
    : "h-12 text-xl md:text-2xl";
  const featuredLogoClass = featured ? "h-12 sm:h-14" : "h-10";

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-stagger={stagger ? true : undefined}
      aria-label={`Open ${project.title} project page`}
      className={`group relative isolate block overflow-hidden border border-white/10 bg-[#080808] transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-2xl hover:shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 ${featured ? "h-[510px] rounded-[2rem] sm:h-[590px] lg:h-[640px]" : "h-[400px] rounded-3xl"} ${className}`.trim()}
    >
      <div
        ref={mediaRef}
        className={`absolute inset-px overflow-hidden ${featured ? "rounded-[calc(2rem-1px)]" : "rounded-[calc(1.5rem-1px)]"}`}
      >
        {project.video ? (
          <>
            {isNearViewport && (
              <OptimizedVideo
                src={project.video}
                poster={project.image}
                alt={project.title}
                autoPlay
                loop
                muted
                preload="metadata"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                quality="medium"
                autoPlayDelay={autoPlayDelayMs}
                releaseOnExit
              />
            )}
            <div className="pixel-overlay pointer-events-none h-full w-full" style={{ borderRadius: "inherit" }} />
          </>
        ) : (
          <OptimizedImage
            src={project.image || "/placeholder.jpg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
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
            backgroundImage: `${featured ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.58) 34%, rgba(0,0,0,0.16) 72%, rgba(0,0,0,0.08) 100%)" : "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 16%, rgba(0,0,0,0.3) 32%, rgba(0,0,0,0.26) 58%, rgba(0,0,0,0) 100%)"}, ${project.accent.surfaceGradient}`,
            backgroundPosition: "center bottom",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "darken",
            filter: featured ? "contrast(1.16) brightness(0.8) saturate(1.18)" : "contrast(1.2) brightness(0.75) saturate(1.2)",
          }}
        />
      </div>

      <div className={`relative z-20 h-full ${featured ? "p-6 sm:p-9" : "p-6"}`}>
        {featured && (
          <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-md sm:left-9 sm:top-9">
            <Sparkles className="size-3" />
            Featured project {String(featureNumber ?? 1).padStart(2, "0")}
          </div>
        )}
        {highlighted && (
          <div
            className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-[0.01em] text-white shadow-lg"
            style={{ background: project.accent.badgeGradient }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Highlight
          </div>
        )}

        <div className={`absolute ${featured ? "bottom-7 left-6 right-6 sm:bottom-9 sm:left-9 sm:right-9" : "bottom-6 left-6 right-6"}`}>
          <div className={featured ? "mb-5 max-w-3xl" : "mb-4"}>
            <h3 className={`flex w-full items-center overflow-hidden font-heading font-[600] leading-none text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)] transition-colors ${featuredTitleClass}`}>
              {project.slug === "aurea" && project.logo ? (
                <span className="flex min-w-0 items-center gap-2.5">
                  <img
                    src={project.logo}
                    alt=""
                    aria-hidden="true"
                    className={`${featuredLogoClass} w-auto shrink-0 object-contain`}
                  />
                  <span className={`font-[family-name:var(--font-bitter)] font-[600] leading-none tracking-[-0.035em] text-white ${featured ? "text-[2.6rem] sm:text-5xl" : "text-[1.65rem]"}`}>
                    Aurea
                  </span>
                </span>
              ) : project.slug === "tuneiq" ? (
                <span className="flex min-w-0 items-center gap-3">
                  <span className={`font-sans font-semibold leading-none tracking-[-0.035em] text-white ${featured ? "text-[2.6rem] sm:text-5xl" : "text-[1.65rem]"}`}>
                    Tune<span className="px-0.5 text-sky-300 font-bold">IQ</span>
                  </span>
                </span>
              ) : project.slug === "waxtrax" ? (
                <span className={`font-[family-name:var(--font-bungee)] font-normal leading-none tracking-[-0.035em] text-white ${featured ? "text-[2.5rem] sm:text-5xl" : "text-[1.6rem]"}`}>
                  <span className="bg-gradient-to-r from-pink-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">wax</span>
                  trax.
                </span>
              ) : project.slug === "jelly-jammers" && project.logo ? (
                <span className="inline-flex h-11 w-[15rem] max-w-full overflow-hidden">
                  <img
                    src={project.logo}
                    alt={project.title}
                    className="h-full w-full"
                  />
                </span>
              ) : project.slug === "songwriterjs" && project.logo ? (
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className={`font-sans font-light leading-none tracking-[-0.035em] text-white ${featured ? "text-[2.6rem] sm:text-5xl" : "text-[1.65rem]"}`}>
                    Songwriter
                  </span>
                  <img
                    src={project.logo}
                    alt="JavaScript"
                    className={`${featured ? "size-11" : "size-7"} shrink-0 object-contain`}
                  />
                </span>
              ) : project.slug === "referee-docs" && project.logo ? (
                <span className="flex min-w-0 items-center gap-2.5">
                  <img
                    src={project.logo}
                    alt=""
                    aria-hidden="true"
                    className={`${featuredLogoClass} w-auto shrink-0 object-contain`}
                  />
                  <span className="inline-flex min-w-0 items-baseline gap-2">
                    <span className={`font-[family-name:var(--font-inter)] font-extrabold leading-none tracking-[-0.045em] text-white ${featured ? "text-[2.5rem] sm:text-5xl" : "text-[1.6rem]"}`}>
                      RE<span className="text-[rgba(255,137,24,1)]">F</span>EREE
                    </span>
                    <span className={`font-sans font-bold leading-none tracking-[-0.035em] text-white ${featured ? "text-[2.25rem] sm:text-4xl" : "text-[1.5rem]"}`}>
                      Docs
                    </span>
                  </span>
                </span>
              ) : project.slug === "referee" && project.logo ? (
                <span className="flex min-w-0 items-center gap-2.5">
                  <img
                    src={project.logo}
                    alt=""
                    aria-hidden="true"
                    className={`${featuredLogoClass} w-auto shrink-0 object-contain`}
                  />
                  <span className={`font-[family-name:var(--font-inter)] font-extrabold leading-none tracking-[-0.045em] text-white ${featured ? "text-[2.6rem] sm:text-5xl" : "text-[1.65rem]"}`}>
                    RE<span className="text-[rgba(255,137,24,1)]">F</span>EREE
                  </span>
                </span>
              ) : project.slug === "wayfarer" && project.logo ? (
                <span className="flex min-w-0 items-center gap-2.5">
                  <img
                    src={project.logo}
                    alt=""
                    aria-hidden="true"
                    className={`${featuredLogoClass} w-auto shrink-0 object-contain`}
                  />
                  <span className={`font-mono font-bold leading-none tracking-[-0.045em] text-white ${featured ? "text-[2.5rem] sm:text-5xl" : "text-[1.6rem]"}`}>
                    wayfarer
                  </span>
                </span>
              ) : project.slug === "gobert-ui" && project.logo ? (
                <span className="flex min-w-0 items-center gap-2.5">
                  <img
                    src={project.logo}
                    alt=""
                    aria-hidden="true"
                    className={`${featured ? "size-14" : "size-10"} shrink-0 object-contain`}
                  />
                  <span className={`font-sans font-bold leading-none tracking-[-0.035em] text-white ${featured ? "text-[2.6rem] sm:text-5xl" : "text-[1.65rem]"}`}>
                    Gobert.
                  </span>
                </span>
              ) : project.logo ? (
                <img
                  src={project.logo}
                  alt={project.title}
                  className={`${featured ? "h-12 sm:h-14" : project.logoCardClassName ?? "h-8 md:h-9"} w-auto max-w-full object-contain object-left`}
                />
              ) : (
                project.title
              )}
            </h3>

            <p
              className={`${featured ? "max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg" : "text-sm text-white/85"}`}
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: featured ? 3 : 2,
                overflow: "hidden",
                lineHeight: featured ? "1.55rem" : "1.25rem",
                textShadow: "text-shadow: 1px 1px 5px #060606",
              }}
            >
              {project.shortDescription}
            </p>
          </div>

          <div className={`mb-3 flex flex-wrap gap-1 ${featured ? "max-w-3xl" : ""}`}>
            {project.technologies.slice(0, featured ? 5 : 3).map((tech) => (
              <Badge key={tech} variant="secondary" className={`border border-white/20 bg-white/20 text-white/90 backdrop-blur-sm ${featured ? "px-2.5 py-1 text-xs" : "text-xs"}`}>
                {tech}
              </Badge>
            ))}
            {project.technologies.length > (featured ? 5 : 3) && (
              <Badge variant="outline" className="border-white/30 bg-white/10 text-xs text-white/80 backdrop-blur-sm">
                +{project.technologies.length - (featured ? 5 : 3)}
              </Badge>
            )}
          </div>

          {featured && (
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
              View case study
              <ArrowUpRight className="size-4" />
            </span>
          )}
        </div>

        <div className={`absolute flex items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm transition-opacity duration-300 ${featured ? "right-6 top-6 size-10 opacity-100 sm:right-9 sm:top-9" : "right-4 top-4 h-8 w-8 opacity-0 group-hover:opacity-100"}`}>
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>
      </div>
    </Link>
  );
}
