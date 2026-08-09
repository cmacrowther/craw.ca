"use client"

import { useState, useRef, useEffect } from 'react'
import { OptimizedImage } from './optimized-image'

interface OptimizedVideoProps {
  src: string
  poster?: string
  alt: string
  className?: string
  mediaClassName?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  width?: number
  height?: number
  fallbackGif?: string
  quality?: 'low' | 'medium' | 'high'
  /**
   * Delay (ms) before this video is allowed to begin autoplay. Useful for
   * staggering autoplay across a grid so the browser does not decode every
   * video simultaneously. Defaults to 0 (immediate, current behavior).
   */
  autoPlayDelay?: number
  /**
   * When true, fully release the decoded video buffer (clear `src` + `load()`)
   * once the element scrolls out of view, and re-attach `src` on re-entry.
   * The poster image keeps the slot visible across the gap.
   */
  releaseOnExit?: boolean
}

export function OptimizedVideo({
  src,
  poster,
  alt,
  className = '',
  mediaClassName = '',
  autoPlay = false,
  loop = true,
  muted = true,
  controls = false,
  preload = 'metadata',
  width,
  height,
  fallbackGif,
  quality = 'medium',
  autoPlayDelay = 0,
  releaseOnExit = false,
}: OptimizedVideoProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [useVideo, setUseVideo] = useState(true)
  const [showStillFrame, setShowStillFrame] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const [mediaPolicyReady, setMediaPolicyReady] = useState(false)
  // When autoPlayDelay > 0 we suppress the HTML `autoplay` attr and any
  // programmatic `.play()` calls until this flag flips, so the browser does
  // not start decoding until the staggered slot opens.
  const [autoPlayReady, setAutoPlayReady] = useState(autoPlayDelay <= 0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Resolve autoplay/data-saving policy before attaching any video source.
  // This prevents the first render from briefly fetching media that the user
  // has explicitly asked the browser not to load.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(mobile)

    let shouldUseVideo = true
    let shouldShowStillFrame = false

    // On mobile, check for low-bandwidth or data saver mode
    if (mobile) {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      if (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        shouldUseVideo = false
      }
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      shouldUseVideo = false
      shouldShowStillFrame = true
    }

    setUseVideo(shouldUseVideo)
    setShowStillFrame(shouldShowStillFrame)
    setMediaPolicyReady(true)
  }, [])

  // Stagger gate: flip `autoPlayReady` true after the requested delay so the
  // grid of cards does not light up every decoder simultaneously.
  useEffect(() => {
    if (autoPlayDelay <= 0) return
    setAutoPlayReady(false)
    const timer = setTimeout(() => {
      const apply = () => setAutoPlayReady(true)
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        ;(window as any).requestIdleCallback(apply, { timeout: 1000 })
      } else {
        apply()
      }
    }, autoPlayDelay)
    return () => clearTimeout(timer)
  }, [autoPlayDelay])

  // Intersection Observer to only load video when visible
  useEffect(() => {
    if (!videoRef.current || !mediaPolicyReady) return

    const videoElement = videoRef.current

    const attachSource = (video: HTMLVideoElement) => {
      if (video.getAttribute('src')) return
      video.preload = isMobile ? 'none' : preload
      video.src = src
      video.load()
    }

    // Older browsers without IntersectionObserver still get a functional
    // video, just without viewport-aware loading.
    if (typeof IntersectionObserver === 'undefined') {
      attachSource(videoElement)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) {
            // Re-attach src if we previously released it.
            attachSource(video)
            // If video is paused and should be playing, try to play
            if (autoPlay && autoPlayReady && video.paused && useVideo) {
              video.play().catch((error) => {
                console.log('Autoplay failed on re-enter:', error)
                if (isMobile) {
                  setShowPlayButton(true)
                }
              })
            }
          } else {
            if (autoPlay && !video.paused) {
              video.pause()
            }
            if (releaseOnExit && entry.intersectionRatio === 0) {
              // Free the decoded video buffer; poster remains visible.
              try {
                video.removeAttribute('src')
                video.load()
              } catch {
                // Ignore — some browsers throw on load() after detach.
              }
            }
          }
        })
      },
      { threshold: [0, 0.1, 0.25], rootMargin: '300px 0px' }
    )

    observer.observe(videoElement)
    return () => observer.disconnect()
  }, [src, autoPlay, autoPlayReady, isMobile, useVideo, releaseOnExit, preload, mediaPolicyReady])

  if (hasError) {
    if (poster) {
      return (
        <OptimizedImage
          src={poster}
          alt={alt}
          width={width}
          height={height}
          className={`${className} object-cover ${mediaClassName}`.trim()}
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

  // Reduced motion should remove playback, not the project media itself. When
  // no dedicated poster is available, a paused video renders its first frame
  // as a still image. This avoids replacing video-backed cards with a flat
  // placeholder while keeping the content motion-free.
  if (!useVideo && showStillFrame) {
    return (
      <div className={`relative bg-muted ${className}`}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          aria-label={alt}
          className={`h-full w-full object-cover ${mediaClassName}`.trim()}
          width={width}
          height={height}
          onLoadedData={(event) => {
            const video = event.currentTarget
            video.pause()

            // A tiny seek requests a decoded frame even when a browser would
            // otherwise stop after loading only video metadata.
            if (video.currentTime === 0 && Number.isFinite(video.duration) && video.duration > 0.1) {
              video.currentTime = 0.1
            }
          }}
          onError={() => setHasError(true)}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  if (!useVideo) {
    if (poster) {
      return (
        <OptimizedImage
          src={poster}
          alt={alt}
          width={width}
          height={height}
          className={`${className} object-cover ${mediaClassName}`.trim()}
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
        autoPlay={autoPlay && autoPlayReady}
        loop={loop}
        muted={muted}
        controls={controls}
        preload="none"
        playsInline
        webkit-playsinline="true" // iOS Safari specific
        x5-video-player-type="h5" // WeChat browser
        x5-video-player-fullscreen="true" // WeChat browser
        className={`w-full h-full object-cover transition-opacity duration-300 ${mediaClassName} ${
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
          if (autoPlay && autoPlayReady && muted && videoRef.current) {
            videoRef.current.play().catch((error) => {
              console.log('Autoplay failed:', error)
              // Only show play button on mobile if autoplay fails
              if (isMobile) {
                setShowPlayButton(true)
              }
            })
          }
        }}
      >
        Your browser does not support the video tag.
      </video>
      
      {/* Mobile play overlay - only show when autoplay fails */}
      {showPlayButton && !isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
          onClick={() => {
            if (videoRef.current) {
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
          className={`absolute inset-0 object-cover ${mediaClassName}`.trim()}
          quality={60}
        />
      )}
    </div>
  )
}
