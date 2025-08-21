"use client"

import { useState, useRef, useEffect } from 'react'
import { OptimizedImage } from './optimized-image'

interface OptimizedVideoProps {
  src: string
  poster?: string
  alt: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  width?: number
  height?: number
  fallbackGif?: string
  quality?: 'low' | 'medium' | 'high'
}

export function OptimizedVideo({
  src,
  poster,
  alt,
  className = '',
  autoPlay = false,
  loop = true,
  muted = true,
  controls = false,
  preload = 'metadata',
  width,
  height,
  fallbackGif,
  quality = 'medium',
}: OptimizedVideoProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [useVideo, setUseVideo] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setUseVideo(false)
    }
  }, [])

  // Intersection Observer to only load video when visible
  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement
            if (video.src === '') {
              video.src = src
            }
          } else {
            const video = entry.target as HTMLVideoElement
            if (autoPlay && video.currentTime > 0) {
              video.pause()
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [src, autoPlay])

  if (hasError || !useVideo) {
    if (poster) {
      return (
        <OptimizedImage
          src={poster}
          alt={alt}
          width={width}
          height={height}
          className={className}
          quality={80}
        />
      )
    }
    return (
      <div className={`bg-muted animate-pulse flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground">Video unavailable</span>
      </div>
    )
  }

  return (
    <div className={`relative ${isLoading ? 'animate-pulse bg-muted' : ''} ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        preload={preload}
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        width={width}
        height={height}
        onLoadedData={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        onLoadStart={() => setIsLoading(true)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {isLoading && poster && (
        <OptimizedImage
          src={poster}
          alt={alt}
          width={width}
          height={height}
          className="absolute inset-0 object-cover"
          quality={60}
        />
      )}
    </div>
  )
}
