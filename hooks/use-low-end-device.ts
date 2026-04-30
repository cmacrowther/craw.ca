"use client"

import { useEffect, useState } from "react"

export type LowEndDeviceState = {
  isLowEnd: boolean
  prefersReducedMotion: boolean
}

const INITIAL_STATE: LowEndDeviceState = {
  isLowEnd: false,
  prefersReducedMotion: false,
}

/**
 * Plain (non-hook) detection so non-React or effect-only code paths can read
 * the same signal without triggering a render-cycle rebuild. Safe to call from
 * inside `useEffect` or imperative setup code. Returns `INITIAL_STATE` on the
 * server.
 */
export function detectLowEndDevice(): LowEndDeviceState {
  if (typeof window === "undefined") return INITIAL_STATE

  let isLowEnd = false
  try {
    const nav = navigator as any
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection
    if (connection) {
      if (connection.saveData === true) isLowEnd = true
      const eff = connection.effectiveType
      if (eff === "slow-2g" || eff === "2g" || eff === "3g") isLowEnd = true
    }
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) isLowEnd = true
    if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) {
      isLowEnd = true
    }
  } catch {
    // Some browsers throw when accessing connection properties; ignore.
  }

  let prefersReducedMotion = false
  try {
    prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    // matchMedia missing; leave false.
  }

  return { isLowEnd, prefersReducedMotion }
}

/**
 * Detects whether the current device should be treated as "low-end" for the
 * purpose of throttling expensive UI work (concurrent video decode, staggered
 * animations, etc).
 *
 * Trips on any of:
 *   - navigator.connection.saveData === true
 *   - navigator.connection.effectiveType in {slow-2g, 2g, 3g}
 *   - navigator.deviceMemory <= 4
 *   - navigator.hardwareConcurrency <= 4
 *
 * SSR-safe: returns `{ isLowEnd: false, prefersReducedMotion: false }` on the
 * server and recomputes once on mount.
 */
export function useLowEndDevice(): LowEndDeviceState {
  const [state, setState] = useState<LowEndDeviceState>(INITIAL_STATE)

  useEffect(() => {
    setState(detectLowEndDevice())
  }, [])

  return state
}
