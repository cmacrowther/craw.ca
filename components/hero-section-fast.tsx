"use client";

import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import dynamic from "next/dynamic"

// Keep the initial page shell light; the WebGL scene loads just after the
// navigation and hero copy have become interactive.
const ThreeWaveBackground = dynamic(
  () => import("./three-wave-background").then((m) => m.ThreeWaveBackground),
  { ssr: false }
)

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
  const [isVisible, setIsVisible] = useState(false)
  const [showTyped, setShowTyped] = useState(false)
  const [showBackground, setShowBackground] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const pointerFrame = useRef<number | null>(null)
  const pointerPosition = useRef({ x: 50, y: 50 })

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

  useEffect(() => {
    return () => {
      if (pointerFrame.current !== null) {
        window.cancelAnimationFrame(pointerFrame.current)
      }
    }
  }, [])

  const updatePointerPosition = (clientX: number, clientY: number) => {
    const hero = heroRef.current
    if (!hero) return

    const bounds = hero.getBoundingClientRect()
    pointerPosition.current = {
      x: ((clientX - bounds.left) / bounds.width) * 100,
      y: ((clientY - bounds.top) / bounds.height) * 100,
    }

    if (pointerFrame.current !== null) return

    pointerFrame.current = window.requestAnimationFrame(() => {
      const section = heroRef.current
      if (section) {
        section.style.setProperty("--hero-pointer-x", `${pointerPosition.current.x}%`)
        section.style.setProperty("--hero-pointer-y", `${pointerPosition.current.y}%`)
      }
      pointerFrame.current = null
    })
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-section relative isolate min-h-[calc(100svh-4rem)] overflow-hidden"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return
        event.currentTarget.style.setProperty("--hero-pointer-active", "1")
        updatePointerPosition(event.clientX, event.clientY)
      }}
      onPointerMove={(event) => {
        if (event.pointerType === "mouse") {
          updatePointerPosition(event.clientX, event.clientY)
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          event.currentTarget.style.setProperty("--hero-pointer-active", "0")
        }
      }}
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
      <div className="hero-cursor-light absolute inset-0 z-[1]" aria-hidden="true" />

      <div className="relative z-[2] mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.16fr)_minmax(24rem,0.84fr)] lg:gap-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
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
              <span className="min-w-0 flex-1 text-white/90" aria-live="polite">
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
