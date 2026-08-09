"use client"

import dynamic from "next/dynamic"

import { useNearViewport } from "@/hooks/use-near-viewport"

const DeferredAbout = dynamic(
  () => import("./about-section").then((module) => module.AboutSection),
  { ssr: false, loading: () => null },
)

const DeferredContact = dynamic(
  () => import("./contact-section").then((module) => module.ContactSection),
  { ssr: false, loading: () => null },
)

type DeferredHomeSectionProps = {
  section: "about" | "contact"
  minHeight: number
}

export function DeferredHomeSection({ section, minHeight }: DeferredHomeSectionProps) {
  const { ref, isNearViewport } = useNearViewport<HTMLDivElement>("1200px")
  const Section = section === "about" ? DeferredAbout : DeferredContact

  return (
    <div
      id={section}
      ref={ref}
      className={section === "about" ? "bg-[#111111]" : "bg-background"}
      style={{ minHeight }}
    >
      {isNearViewport && <Section />}
    </div>
  )
}
