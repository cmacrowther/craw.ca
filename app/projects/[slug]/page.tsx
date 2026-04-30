import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Globe, Sparkles } from "lucide-react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { OptimizedImage } from "@/components/optimized-image";
import { ProjectShowcaseCard } from "@/components/project-showcase-card";
import { OptimizedVideo } from "@/components/optimized-video";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  categoryLabels,
  distributionLabels,
  getProjectBySlug,
  getRelatedProjects,
  isEmbeddableProject,
  projectStateLabels,
  projects,
  type ProjectCopyLink,
  type Project,
} from "@/lib/projects";
import { ProjectPixelBackground } from "@/components/project-pixel-background";

const siteUrl = "https://cmacrowther.com";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Colin Crowther",
      alternates: { canonical: "/projects" },
    };
  }

  const title = `${project.title} | Colin Crowther`;
  const description = project.longDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/projects/${project.slug}`,
      siteName: "Colin Crowther Portfolio",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${project.title} - Colin Crowther`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

function ProjectMedia({
  project,
  priority = false,
  quality = "high",
  withCrt = true,
  wrapperClassName = "aspect-[16/10] w-full",
  mediaClassName = "",
}: {
  project: Project;
  priority?: boolean;
  quality?: "low" | "medium" | "high";
  withCrt?: boolean;
  wrapperClassName?: string;
  mediaClassName?: string;
}) {
  if (project.video) {
    return (
      <div className={`relative overflow-hidden ${wrapperClassName}`}>
        <OptimizedVideo
          src={project.video}
          poster={project.image || "/placeholder.jpg"}
          alt={project.title}
          autoPlay
          loop
          muted
          preload="metadata"
          className="h-full w-full"
          mediaClassName={mediaClassName}
          quality={quality}
          releaseOnExit
        />
        {withCrt && <div className="crt-effect pointer-events-none rounded-[2rem]" style={{ borderRadius: "inherit" }} />}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      <OptimizedImage
        src={project.image || "/placeholder.jpg"}
        alt={project.title}
        fill
        className={`object-cover ${mediaClassName}`.trim()}
        quality={90}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 45vw"
      />
    </div>
  );
}

function renderProjectCopy(text: string, copyLinks?: ProjectCopyLink[]) {
  if (!copyLinks?.length) {
    return text;
  }

  type CopySegment = string | ProjectCopyLink;

  const segments = copyLinks.reduce<CopySegment[]>((parts, link) => {
    let replaced = false;

    return parts.flatMap((part) => {
      if (replaced || typeof part !== "string") {
        return [part];
      }

      const matchIndex = part.indexOf(link.term);

      if (matchIndex === -1) {
        return [part];
      }

      replaced = true;

      const before = part.slice(0, matchIndex);
      const after = part.slice(matchIndex + link.term.length);

      return [before, link, after].filter(Boolean);
    });
  }, [text]);

  return segments.map((segment, index) => {
    if (typeof segment === "string") {
      return segment;
    }

    return (
      <a
        key={`${segment.term}-${segment.href}-${index}`}
        href={segment.href}
        target="_blank"
        rel="noopener noreferrer"
        className="site-link-inline font-medium"
      >
        {segment.term}
      </a>
    );
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.slug, 3);
  const hasLivePreview = isEmbeddableProject(project);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12rem] top-16 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{ background: project.accent.spotlight }} />
          <div className="absolute right-[-8rem] top-[24rem] h-[24rem] w-[24rem] rounded-full blur-3xl" style={{ background: project.accent.surfaceGradient }} />
        </div>

        <section className="relative px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="container mx-auto max-w-7xl">
            <Link
              href="/#projects"
              className="site-link-muted mb-8 project-difference inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 font-body text-sm font-medium backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to featured work
            </Link>

            <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.92fr)] xl:items-start xl:gap-16">
              <div className="max-w-4xl xl:max-w-none xl:pt-6">
                  <span
                    className="inline-flex project-difference items-center rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg"
                    style={{ background: project.accent.badgeGradient }}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Project Deep Dive
                  </span>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="rounded-full border-border/60 bg-background/70 px-3 py-1 text-sm dark:border-white/10 dark:bg-white/5">
                      {project.releaseDate}
                    </Badge>
                    <Badge variant="outline" className="rounded-full border-border/60 bg-background/70 px-3 py-1 text-sm dark:border-white/10 dark:bg-white/5">
                      {projectStateLabels[project.projectState]}
                    </Badge>
                    <Badge variant="outline" className="rounded-full border-border/60 bg-background/70 px-3 py-1 text-sm dark:border-white/10 dark:bg-white/5">
                      {distributionLabels[project.distribution]}
                    </Badge>
                    {project.categories.map((category) => (
                      <Badge key={category} variant="outline" className="rounded-full border-border/60 bg-background/70 px-3 py-1 text-sm dark:border-white/10 dark:bg-white/5">
                        {categoryLabels[category]}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="rounded-full border-border/60 bg-background/70 px-3 py-1 text-sm dark:border-white/10 dark:bg-white/5">
                      {project.technologies.length} technologies
                    </Badge>
                  </div>

                  <h1 className="mt-6 project-dodge max-w-3xl font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    {project.title}
                  </h1>
                  <p className="mt-6 max-w-2xl font-body text-xl leading-relaxed text-muted-foreground">
                    {renderProjectCopy(project.longDescription, project.copyLinks)}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {project.liveUrl && (
                      <Button
                        asChild
                        className="h-11 rounded-full px-6 text-base project-lighter font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
                        style={{ background: project.accent.badgeGradient }}
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                          Visit Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild variant="outline" className="h-11 project-lighter rounded-full px-6 text-base font-semibold">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          View Source Code
                        </a>
                      </Button>
                    )}
                  </div>
              </div>

              <div className="xl:pt-4">
                <div className="arcade-screen-stage project-lighter relative mx-auto w-full max-w-[46rem] xl:ml-auto xl:mr-0">
                  <div className="absolute -inset-6 rounded-[3rem] blur-3xl opacity-80" style={{ background: project.accent.surfaceGradient }} />
                  <div className="arcade-screen-shell relative">
                    <div className="arcade-screen-frame">
                      <div className="arcade-screen-viewport relative overflow-hidden bg-black/80">
                        <ProjectMedia
                          project={project}
                          priority
                          wrapperClassName="aspect-[16/9] w-full"
                          mediaClassName="arcade-screen-media"
                        />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/8 to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 via-black/16 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                          {project.liveUrl && (
                            <div className="w-fit rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
                              Live demo available
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="arcade-screen-glass pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
              <div className="relative">
                <div className="absolute inset-0 rounded-[2rem] bg-card dark:bg-neutral-900 project-lighter" />
                <div className="relative rounded-[2rem] border border-border/60 bg-card/80 p-8 h-[100%]">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/[0.08]">
                      <Sparkles className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">Project Story</p>
                      <h2 className="font-heading text-2xl font-bold text-foreground">What this project is about</h2>
                    </div>
                  </div>
                  <p className="max-w-3xl font-body text-lg leading-8 text-muted-foreground">
                    {renderProjectCopy(project.projectStory, project.copyLinks)}
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-border/50 bg-background/70 p-5 dark:border-white/10 dark:bg-black/20">
                      <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">Build Focus</p>
                      <p className="mt-3 font-heading text-xl font-semibold text-foreground">{project.buildFocus}</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-border/50 bg-background/70 p-5 dark:border-white/10 dark:bg-black/20">
                      <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">Experience Goal</p>
                      <p className="mt-3 font-heading text-xl font-semibold text-foreground">{project.experienceGoal}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-[2rem] bg-card dark:bg-neutral-900 project-lighter" />
              <div className="relative rounded-[2rem] border h-[100%] border-border/60 bg-card/80 p-8">
                <div className="mb-6">
                  <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">Technology Stack</p>
                  <h2 className="mt-3 font-heading text-2xl font-bold text-foreground">Built with</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="rounded-full px-3 py-1 text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <div className="rounded-[1.5rem] border border-border/50 bg-background/70 p-5 dark:border-white/10 dark:bg-black/20">
                    <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">Categories</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="rounded-full px-3 py-1 text-sm">
                          {categoryLabels[category]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-border/50 bg-background/70 p-5 dark:border-white/10 dark:bg-black/20">
                    <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">Release Date</p>
                    <p className="mt-2 font-heading text-lg font-semibold text-foreground">{project.releaseDate}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-border/50 bg-background/70 p-5 dark:border-white/10 dark:bg-black/20">
                    <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">Project State</p>
                    <p className="mt-2 font-heading text-lg font-semibold text-foreground">{projectStateLabels[project.projectState]}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-border/50 bg-background/70 p-5 dark:border-white/10 dark:bg-black/20">
                    <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">Distribution</p>
                    <p className="mt-2 font-heading text-lg font-semibold text-foreground">{distributionLabels[project.distribution]}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-border/50 bg-background/70 p-5 dark:border-white/10 dark:bg-black/20">
                    <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">External Links</p>
                    <p className="mt-2 font-heading text-lg font-semibold text-foreground">
                      {project.liveUrl && project.githubUrl ? "Live demo + source code" : project.liveUrl ? "Live demo" : project.githubUrl ? "Source code" : "Private project"}
                    </p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {hasLivePreview && project.liveUrl && (
          <section className="relative px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
            <div className="container mx-auto max-w-7xl">
              <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-col gap-4 border-b border-border/60 p-6 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">Live Preview</p>
                    <h2 className="mt-3 font-heading text-2xl font-bold text-foreground">Step inside the project</h2>
                  </div>
                  <Button asChild variant="outline" className="rounded-full">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Open in a new tab
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="relative aspect-[16/11] bg-black">
                  <iframe
                    src={project.liveUrl}
                    className="h-full w-full border-0"
                    title={`Live preview of ${project.title}`}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="relative px-4 pb-20 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">More Work</p>
                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">Keep exploring</h2>
              </div>
              <Button asChild variant="link" className="justify-start gap-1.5 px-0 text-base font-semibold sm:justify-center">
                <Link href="/#projects">Browse all featured projects <ArrowUpRight className="size-4" /></Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedProjects.map((relatedProject, index) => (
                <ProjectShowcaseCard
                  key={relatedProject.slug}
                  project={relatedProject}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        <ProjectPixelBackground />
      </main>
      <Footer />
    </div>
  );
}
