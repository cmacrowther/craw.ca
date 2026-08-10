"use client";

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import dynamic from "next/dynamic"

// Keep the initial page shell light; the WebGL scene loads just after the
// navigation and hero copy have become interactive.
const ThreeWaveBackground = dynamic(
  () => import("./three-wave-background").then((m) => m.ThreeWaveBackground),
  { ssr: false }
)

function PixelTerminalMark() {
  return (
    <svg
      viewBox="0 0 192 160"
      className="hero-build-log-mark"
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      {/* Terminal frame */}
      <rect x="12" y="12" width="168" height="8" fill="currentColor" />
      <rect x="12" y="20" width="8" height="128" fill="currentColor" />
      <rect x="172" y="20" width="8" height="128" fill="currentColor" />
      <rect x="12" y="140" width="168" height="8" fill="currentColor" />
      <rect x="20" y="40" width="152" height="8" fill="currentColor" />

      {/* Window controls */}
      <rect x="32" y="28" width="8" height="8" fill="currentColor" />
      <rect x="48" y="28" width="8" height="8" fill="currentColor" />
      <rect x="64" y="28" width="8" height="8" fill="currentColor" />

      {/* Pixel prompt: >_ */}
      <rect x="52" y="68" width="12" height="12" fill="currentColor" />
      <rect x="64" y="80" width="12" height="12" fill="currentColor" />
      <rect x="52" y="92" width="12" height="12" fill="currentColor" />
      <rect x="96" y="92" width="40" height="12" fill="currentColor" />
    </svg>
  )
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTyped, setShowTyped] = useState(false)
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(true), 10)
    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowBackground(true), 250)
    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timeout = window.setTimeout(() => setShowTyped(true), 780)
    return () => window.clearTimeout(timeout)
  }, [isVisible])

  return (
    <section
      id="home"
      className="hero-section relative isolate min-h-[calc(100svh-4rem)] overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: isVisible && showBackground ? 1 : 0,
          transition: "opacity 1.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {showBackground && <ThreeWaveBackground />}
      </div>

      <div className="hero-grid absolute inset-0 z-[1]" aria-hidden="true" />
      <div className="hero-glow absolute inset-0 z-[1]" aria-hidden="true" />

      <div className="relative z-[2] mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-12">
        <div
          className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.16fr)_minmax(24rem,0.84fr)] lg:gap-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="max-w-4xl">
            <div className="hero-kicker mb-7 flex items-center gap-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white/60 sm:text-xs">
              <span className="hero-status-dot" aria-hidden="true" />
              <span>Colin Crowther</span>
              <span className="h-px w-8 bg-white/25" aria-hidden="true" />
              <span>Canada</span>
            </div>

            <h1 className="max-w-4xl font-heading text-5xl font-[650] leading-[0.94] tracking-[-0.055em] text-white/80 sm:text-6xl md:text-7xl lg:text-[5.35rem]">
              Digital work
              <br />
              with a <span className="hero-accent-text">point of view.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              I&apos;m a full-stack developer who turns ambitious ideas into clear,
              useful products—where considered design and solid engineering meet.
            </p>

            <div className="hero-terminal mt-8 flex min-h-12 max-w-2xl items-center gap-3 border-y border-white/12 py-3 font-mono text-sm text-white/70 sm:text-base">
              <span className="shrink-0 text-white/35">///</span>
              <span className="shrink-0 text-white/45">now:</span>
              <span className="text-white/90" aria-live="polite">
                {showTyped && (
                  <TypewriterEffect
                    strings={[
                      "Building thoughtful web experiences.",
                      "Bridging design and engineering.",
                      "Exploring the next useful idea.",
                    ]}
                    typeSpeed={44}
                    backSpeed={18}
                    backDelay={3000}
                    cursorChar="_"
                  />
                )}
              </span>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a className="hero-primary-action" href="#projects">
                View selected work
                <ArrowDown className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a className="hero-secondary-action" href="#contact">
                Start a conversation
                <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="hero-build-log relative flex w-full max-w-xl justify-self-end overflow-hidden border border-white/20 bg-black/25 p-6 backdrop-blur-sm sm:p-8 lg:min-h-[29rem] lg:p-9">
            <PixelTerminalMark />
            <div className="relative z-10 flex h-full w-full flex-col">
              <div className="mb-16 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/45">
                <span>Build log</span>
                <span>01 / 01</span>
              </div>

              <p className="max-w-[21rem] font-heading text-3xl font-medium leading-[1.03] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.35rem]">
                Thoughtful interfaces, built to last.
              </p>

              <div className="mt-auto grid grid-cols-2 gap-5 border-t border-white/12 pt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/45">
                <div>
                  <p>Focus</p>
                  <p className="mt-1.5 tracking-[0.04em] text-white/80">Web products</p>
                </div>
                <div>
                  <p>Approach</p>
                  <p className="mt-1.5 tracking-[0.04em] text-white/80">Design + code</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="hero-scroll-cue absolute bottom-7 left-6 z-[2] hidden items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/45 sm:flex lg:left-12">
        <span className="h-px w-9 bg-white/30" aria-hidden="true" />
        <span>Scroll to explore</span>
      </div>

      {/* Keep the site-wide pixel texture over the whole hero, including its copy. */}
      <div
        className="pixel-overlay absolute inset-0"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1.4s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden="true"
      />
    </section>
  )
}
