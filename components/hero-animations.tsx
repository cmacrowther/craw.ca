"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

import { TypewriterEffect } from "@/components/ui/typewriter-effect"

const ThreeWaveBackground = dynamic(
  () => import("./three-wave-background").then((module) => module.ThreeWaveBackground),
  { ssr: false }
)

const TYPEWRITER_STRINGS = [
  "Building thoughtful web experiences.",
  "Bridging design and engineering.",
  "Exploring the next useful idea.",
]

export function HeroTypewriter() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 780)
    return () => window.clearTimeout(timer)
  }, [])

  if (!isReady) return null

  return (
    <TypewriterEffect
      strings={TYPEWRITER_STRINGS}
      typeSpeed={44}
      backSpeed={18}
      backDelay={3000}
      cursorChar="_"
    />
  )
}

export function HeroEnhancements() {
  const [showBackground, setShowBackground] = useState(false)
  const pointerFrame = useRef<number | null>(null)
  const pointerPosition = useRef({ x: 50, y: 50 })

  useEffect(() => {
    const hero = document.getElementById("home")
    if (!hero) return

    const backgroundTimer = window.setTimeout(() => setShowBackground(true), 250)

    const updatePointerPosition = (clientX: number, clientY: number) => {
      const bounds = hero.getBoundingClientRect()
      pointerPosition.current = {
        x: ((clientX - bounds.left) / bounds.width) * 100,
        y: ((clientY - bounds.top) / bounds.height) * 100,
      }

      if (pointerFrame.current !== null) return

      pointerFrame.current = window.requestAnimationFrame(() => {
        hero.style.setProperty("--hero-pointer-x", `${pointerPosition.current.x}%`)
        hero.style.setProperty("--hero-pointer-y", `${pointerPosition.current.y}%`)
        pointerFrame.current = null
      })
    }

    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      hero.style.setProperty("--hero-pointer-active", "1")
      updatePointerPosition(event.clientX, event.clientY)
    }
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        updatePointerPosition(event.clientX, event.clientY)
      }
    }
    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        hero.style.setProperty("--hero-pointer-active", "0")
      }
    }

    hero.addEventListener("pointerenter", handlePointerEnter)
    hero.addEventListener("pointermove", handlePointerMove)
    hero.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      window.clearTimeout(backgroundTimer)
      hero.removeEventListener("pointerenter", handlePointerEnter)
      hero.removeEventListener("pointermove", handlePointerMove)
      hero.removeEventListener("pointerleave", handlePointerLeave)
      if (pointerFrame.current !== null) {
        window.cancelAnimationFrame(pointerFrame.current)
      }
    }
  }, [])

  return (
    <>
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-[1400ms] ease-out motion-reduce:transition-none ${showBackground ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        {showBackground && <ThreeWaveBackground />}
      </div>
      <div className="hero-cursor-light absolute inset-0 z-[1]" aria-hidden="true" />
    </>
  )
}
