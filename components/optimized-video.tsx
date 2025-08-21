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
  const [playAttempted, setPlayAttempted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Check if device is mobile
  const isMobile = useRef(false)
  useEffect(() => {
    isMobile.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // On mobile, be more conservative with video usage
    if (isMobile.current) {
      // Check for low-bandwidth or data saver mode
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      if (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        setUseVideo(false)
      }
    }
  }, [])

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
            // If video is paused and should be playing, try to play
            if (autoPlay && video.paused && useVideo) {
              video.load()
              video.play().catch((error) => {
                console.log('Autoplay failed on re-enter:', error)
                if (isMobile.current) {
                  setShowPlayButton(true)
                }
              })
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
  }, [src, autoPlay, muted, poster])

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

  // Get the correct MIME type based on file extension
  const getMimeType = (src: string): string => {
    const extension = src.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'webm':
        return 'video/webm'
      case 'mp4':
        return 'video/mp4'
      case 'mov':
        return 'video/quicktime'
      case 'avi':
        return 'video/x-msvideo'
      default:
        return 'video/mp4'
    }
  }

  return (
    <div className={`relative ${isLoading ? 'animate-pulse bg-muted' : ''} ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        autoPlay={autoPlay && !isMobile.current} // Disable autoplay on mobile initially
        loop={loop}
        muted={muted}
        controls={controls}
        preload={isMobile.current ? 'none' : preload} // Reduce preload on mobile
        playsInline
        webkit-playsinline="true" // iOS Safari specific
        x5-video-player-type="h5" // WeChat browser
        x5-video-player-fullscreen="true" // WeChat browser
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        width={width}
        height={height}
        onLoadedData={() => setIsLoading(false)}
        onError={() => {
          console.log('Video error, falling back to image')
          setHasError(true)
        }}
        onLoadStart={() => setIsLoading(true)}
        onPlay={() => {
          setIsPlaying(true)
          setShowPlayButton(false)
        }}
        onPause={() => setIsPlaying(false)}
        onCanPlay={() => {
          // Try to play when video is ready (mobile compatibility)
          if (autoPlay && muted && videoRef.current) {
            videoRef.current.play().catch((error) => {
              console.log('Autoplay failed:', error)
              // Only show play button on mobile if autoplay fails
              if (isMobile.current) {
                setShowPlayButton(true)
              }
            })
          }
        }}
      >
        <source src={src} type={getMimeType(src)} />
        {/* Fallback for different formats */}
        {src.includes('.webm') && (
          <>
            <source src={src.replace('.webm', '.mp4')} type="video/mp4" />
            <source src={src.replace('.webm', '.mov')} type="video/quicktime" />
          </>
        )}
        Your browser does not support the video tag.
      </video>
      
      {/* Mobile play overlay - only show when autoplay fails */}
      {showPlayButton && !isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
          onClick={() => {
            if (videoRef.current) {
              setPlayAttempted(true)
              setShowPlayButton(false)
              videoRef.current.play().catch(console.log)
            }
          }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}
      
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
