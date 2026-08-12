import { ArrowDown, ArrowUpRight } from "lucide-react"

function HeroColorComposition() {
  return (
    <div className="hero-art-stage" aria-hidden="true">
      <span className="hero-art-grid" />
      <span className="hero-art-shape hero-art-shape-blue" />
      <span className="hero-art-shape hero-art-shape-pink" />
      <span className="hero-art-shape hero-art-shape-yellow" />
      <span className="hero-art-shape hero-art-shape-purple" />
      <span className="hero-art-pixel hero-art-pixel-one" />
      <span className="hero-art-pixel hero-art-pixel-two" />
      <span className="hero-art-pixel hero-art-pixel-three" />
      <span className="hero-art-pixel hero-art-pixel-four" />
    </div>
  )
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="hero-section relative isolate min-h-[calc(100svh-4rem)] overflow-hidden"
    >
      <div className="hero-grid absolute inset-0 z-[1]" aria-hidden="true" />
      <div className="hero-glow absolute inset-0 z-[1]" aria-hidden="true" />

      <div className="relative z-[2] mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.16fr)_minmax(24rem,0.84fr)] lg:gap-16">
          <div className="hero-copy max-w-4xl">
            <h1 className="max-w-4xl font-heading text-5xl font-[650] leading-[0.94] tracking-[-0.055em] text-white/80 sm:text-6xl md:text-7xl lg:text-[5.35rem]">
              Digital work
              <br />
              with a <span className="hero-accent-text">point of view.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              I&apos;m a full-stack developer who turns ambitious ideas into clear,
              useful products; Where considered design and solid engineering meet.
            </p>

            <div className="hero-terminal mt-8 flex min-h-12 max-w-2xl items-center gap-3 border-y border-white/12 py-3 font-mono text-sm text-white/70 sm:text-base">
              <span className="shrink-0 text-white/35">///</span>
              <span className="shrink-0 text-white/45">now:</span>
              <span className="min-w-0 flex-1 text-white/90">
                Building thoughtful web experiences.
                <span className="ml-1 animate-pulse" aria-hidden="true">_</span>
              </span>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a className="hero-primary-action" href="#projects">
                View selected work
                <ArrowDown className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a className="hero-secondary-action" href="/contacts">
                Start a conversation
                <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-art-container w-full max-w-xl justify-self-end">
            <HeroColorComposition />
          </div>
        </div>
      </div>

      {/* Keep the site-wide pixel texture over the whole hero, including its copy. */}
      <div className="pixel-overlay absolute inset-0" aria-hidden="true" />
    </section>
  )
}
