"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowUpRight, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { useMediaQuery, useNearViewport } from "@/hooks/use-near-viewport"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation-optimized"

const ParticleBackground = dynamic(
  () => import("./particle-background").then((module) => ({ default: module.ParticleBackground })),
  { ssr: false, loading: () => null },
)

function ModelFallback() {
  return <div className="h-full w-full animate-pulse rounded-[calc(2rem-1px)] bg-white/[0.06]" aria-hidden="true" />
}

const GLBViewer = dynamic(
  () => import("./glb-viewer").then((module) => module.GLBViewer),
  { ssr: false, loading: () => <ModelFallback /> },
)

const skills = [
  "Java",
  "Struts 2",
  "Spring Boot",
  "PHP",
  "Drupal",
  "Laravel",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Angular",
  "Node.js",
  "Python",
  "Flask",
  "C#",
  ".NET/ASP.NET",
  ".NET Core",
  "PostgreSQL",
  "MongoDB",
  "Oracle DB",
  "PL/SQL",
  "SQL Server",
  "AWS",
  "Azure",
  "DigitalOcean",
  "Docker",
  "Kubernetes",
  "Git",
]

export function AboutSection() {
  const { ref: sectionRef, isNearViewport } = useNearViewport<HTMLElement>("800px")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const headerRef = useScrollAnimation({ delay: 100, stagger: 40 })
  const contentRef = useScrollAnimation({ delay: 200, stagger: 90 })
  const skillsRef = useStaggeredAnimation({
    delay: 300,
    stagger: 30,
    childSelector: "[data-stagger]",
  })

  return (
    <section ref={sectionRef} className="deferred-rendering relative overflow-hidden bg-[#111111] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      {/* Keep the moving particle field as a living layer behind the content. */}
      {isNearViewport && <ParticleBackground />}
      {/* The pixel texture is intentionally retained, now scoped to the section. */}
      <div aria-hidden="true" className="pixel-overlay absolute inset-0 z-[1] opacity-25" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div ref={headerRef} className="mb-14 max-w-4xl sm:mb-20">
          <span className="animate-fade-down mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 shadow-lg shadow-black/20 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            About the human
          </span>
          <h2 data-animate className="mb-5 pixel-mask-text text-4xl font-heading font-[650] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
            Building software<br className="hidden sm:block" /> with a creative edge.
          </h2>
          <p data-animate className="max-w-2xl font-body text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I combine full-stack engineering with a sharp eye for the experience on the other side of the screen.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.92fr] lg:gap-8">
          <div data-animate className="max-w-xl py-3 lg:py-8 lg:pr-6">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">The approach</p>
              <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  I&apos;m a <span className="font-semibold text-white">full-stack developer</span> with a creative edge, combining technical depth with an eye for design. The best software is not only functional—it&apos;s intuitive, accessible, and considered from the first interaction onward.
                </p>
                <p>
                  By day, I build enterprise systems with Java. By night, I explore modern frameworks, prototype new ideas, and turn interesting concepts into polished experiences.
                </p>
                <p>
                  I&apos;ve worked across a wide mix of languages and platforms, and I&apos;m always looking for the next thing to learn. If you&apos;d like a copy of my résumé, let&apos;s talk.
                </p>
              </div>

              <Link
                href="/#contact"
                className="group mt-9 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black"
              >
                Start a conversation
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <div
            data-animate
            className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-0"
          >
            <div aria-hidden="true" className="absolute left-1/2 top-[8%] h-[82%] w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
            <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div aria-hidden="true" className="absolute left-[20%] top-[20%] size-44 rounded-full bg-cyan-300/[0.09] blur-3xl" />
            <div aria-hidden="true" className="absolute bottom-[16%] right-[18%] size-40 rounded-full bg-violet-400/[0.09] blur-3xl" />
            <div className="absolute left-6 top-6 z-10 sm:left-8 sm:top-8">
              <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/55">Design-minded developer</p>
              <p className="text-sm font-medium text-white/90">Colin Crowther</p>
            </div>

            <div className="relative z-[1] h-[360px] w-full sm:h-[460px] lg:absolute lg:inset-0 lg:h-full">
              {isNearViewport && isDesktop !== null ? <GLBViewer modelUrl="/model.glb" /> : <ModelFallback />}
            </div>
          </div>
        </div>

        <div
          data-animate
          className="mt-16 border-t border-white/15 pt-8 sm:mt-20 sm:pt-10"
        >
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">The toolkit</p>
              <h3 className="text-2xl font-heading font-[650] tracking-[-0.03em] text-white sm:text-3xl">Technologies I&apos;ve worked with</h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-right">A mix of durable enterprise foundations and the tools I use to move quickly on the web.</p>
          </div>
          <div ref={skillsRef} className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                data-stagger
                variant="outline"
                className="rounded-full border-white/15 bg-white/[0.035] px-3 py-1.5 text-sm text-white/80 transition-colors hover:border-white/35 hover:bg-white/[0.09] hover:text-white"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
