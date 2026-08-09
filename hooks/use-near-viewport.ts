"use client"

import { useEffect, useRef, useState } from "react"

/** Mount expensive visual effects shortly before their container is visible. */
export function useNearViewport<T extends Element>(rootMargin = "600px") {
  const ref = useRef<T>(null)
  const [isNearViewport, setIsNearViewport] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || isNearViewport) return

    if (typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsNearViewport(true)
        observer.disconnect()
      },
      { rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [isNearViewport, rootMargin])

  return { ref, isNearViewport }
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const update = () => setMatches(mediaQuery.matches)

    update()
    mediaQuery.addEventListener("change", update)
    return () => mediaQuery.removeEventListener("change", update)
  }, [query])

  return matches
}
