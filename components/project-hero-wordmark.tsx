import { Music3 } from "lucide-react";

import type { Project } from "@/lib/projects";

type ProjectHeroWordmarkProps = {
  project: Pick<Project, "slug" | "title" | "logo">;
};

const wordmarkFrame =
  "inline-flex max-w-full items-center py-4 sm:py-5";

export function ProjectHeroWordmark({ project }: ProjectHeroWordmarkProps) {
  if (project.slug === "tuneiq") {
    return (
      <span className={`${wordmarkFrame} gap-3 sm:gap-4`}>
        <span className="font-sans text-[2rem] font-semibold leading-none tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
          Tune<span className="px-0.5 text-sky-300 font-bold">IQ</span>
        </span>
      </span>
    );
  }

  if (project.slug === "waxtrax") {
    return (
      <span className={`${wordmarkFrame} font-[family-name:var(--font-bungee)] text-[2rem] font-normal leading-none tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl`}>
        <span className="bg-gradient-to-r from-pink-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">wax</span>
        trax.
      </span>
    );
  }

  if (project.slug === "songwriterjs" && project.logo) {
    return (
      <span className={`${wordmarkFrame} gap-3 sm:gap-4`}>
        <span className="font-sans text-[2rem] font-light leading-none tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
          Songwriter
        </span>
        <img
          src={project.logo}
          alt="JavaScript"
          className="size-9 shrink-0 object-contain sm:size-14 lg:size-16"
        />
      </span>
    );
  }

  if ((project.slug === "referee" || project.slug === "referee-docs") && project.logo) {
    return (
      <span className={`${wordmarkFrame} gap-3 sm:gap-4`}>
        <img
          src={project.logo}
          alt=""
          aria-hidden="true"
          className="h-12 w-auto shrink-0 object-contain sm:h-16 lg:h-20"
        />
        <span className="inline-flex min-w-0 items-baseline gap-2 sm:gap-3">
          <span className="font-[family-name:var(--font-inter)] text-[1.625rem] font-extrabold leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            RE<span className="text-[rgba(255,137,24,1)]">F</span>EREE
          </span>
          {project.slug === "referee-docs" && (
            <span className="font-sans text-xl font-bold leading-none tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Docs
            </span>
          )}
        </span>
      </span>
    );
  }

  if (project.slug === "wayfarer" && project.logo) {
    return (
      <span className={`${wordmarkFrame} gap-3 sm:gap-4`}>
        <img
          src={project.logo}
          alt=""
          aria-hidden="true"
          className="h-14 w-auto shrink-0 object-contain sm:h-16 lg:h-20"
        />
        <span className="font-mono text-3xl font-bold leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
          wayfarer
        </span>
      </span>
    );
  }

  if (project.slug === "gobert-ui" && project.logo) {
    return (
      <span className={`${wordmarkFrame} gap-3 sm:gap-4`}>
        <img
          src={project.logo}
          alt=""
          aria-hidden="true"
          className="size-14 shrink-0 object-contain sm:size-16 lg:size-20"
        />
        <span className="font-sans text-4xl font-bold leading-none tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
          Gobert.
        </span>
      </span>
    );
  }

  if (project.slug === "jelly-jammers" && project.logo) {
    return (
      <span className="inline-flex max-w-full overflow-hidden rounded-2xl bg-neutral-950 px-3 py-3 sm:px-5 sm:py-4">
        <img
          src={project.logo}
          alt={project.title}
          className="h-auto max-h-28 w-full max-w-[44rem] sm:max-h-32"
        />
      </span>
    );
  }

  if (project.logo) {
    return (
      <span className={wordmarkFrame}>
        <img
          src={project.logo}
          alt={project.title}
          className="h-14 w-auto max-w-full object-contain object-left sm:h-16 lg:h-20"
        />
      </span>
    );
  }

  return project.title;
}
