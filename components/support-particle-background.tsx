"use client"

import dynamic from "next/dynamic"

const ParticleBackground = dynamic(
  () => import("./particle-background").then((module) => module.ParticleBackground),
  { ssr: false, loading: () => null },
)

export function SupportParticleBackground() {
  return <ParticleBackground />
}
