"use client"

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface PaperAirplane {
  id: number
  x: number
  y: number
  speed: number
  size: number
  opacity: number
  rotation: number
  delay: number
}

export function PaperAirplaneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const airplanesRef = useRef<PaperAirplane[]>([])
  const lastFrameTimeRef = useRef<number>(0)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let isInitialized = false

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      
      // Set actual canvas size in memory (scaled to account for high DPI devices)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      // Scale the drawing context so everything draws at normal size
      ctx.scale(dpr, dpr)
      
      // Set the size of the canvas on screen
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      // Re-initialize airplanes after resize
      if (isInitialized) {
        initAirplanes()
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Use a timeout to ensure the canvas is properly sized before initializing
    const initTimeout = setTimeout(() => {
      isInitialized = true
      resizeCanvas()
      initAirplanes()
      animate()
    }, 100)

    const startTime = Date.now()

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx || !isInitialized) return
      
      const currentTime = Date.now()
      const dpr = window.devicePixelRatio || 1
      const canvasWidth = canvas.width / dpr
      const canvasHeight = canvas.height / dpr
      const isMobile = window.innerWidth < 768
      
      // Throttle frame rate on mobile to 30fps to prevent flashing
      const targetFPS = isMobile ? 30 : 60
      const frameInterval = 1000 / targetFPS
      
      if (currentTime - lastFrameTimeRef.current < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      
      lastFrameTimeRef.current = currentTime
      
      // Clear the canvas with transparency (no background fill)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Animate all frames consistently to prevent flashing
      airplanesRef.current.forEach((airplane) => {
        // Check if airplane should start moving based on delay
        if (currentTime - startTime < airplane.delay) return

        // Move airplane diagonally from bottom-left to top-right
        airplane.x += airplane.speed // Move right
        airplane.y -= airplane.speed // Move up

        // Reset airplane when it goes off screen (top or right side)
        if (airplane.x > canvasWidth + 100 || airplane.y < -100) {
          airplane.x = Math.random() * canvasWidth
          airplane.y = canvasHeight + Math.random() * 100
        }

        // Draw airplane using the exact SVG path
        ctx.save()
        ctx.translate(airplane.x, airplane.y)
        ctx.rotate(airplane.rotation)
        ctx.globalAlpha = airplane.opacity

        // Center the airplane (SVG is roughly 157x134, center it)
        ctx.translate(-airplane.size / 2, -airplane.size * 134 / 157 / 2)

        // Create and draw the paper airplane path
        const airplanePath = createAirplanePath(airplane.size)
        
        // Use explicit color based on theme for better mobile compatibility
        // Fallback to CSS variable reading if theme isn't available
        let strokeColor = '#475569' // default light color
        
        if (resolvedTheme === 'dark') {
          strokeColor = '#f1f5f9'
        } else if (resolvedTheme === 'light') {
          strokeColor = '#475569'
        } else if (typeof window !== 'undefined') {
          // Fallback: read CSS variable directly
          const computedStyle = getComputedStyle(document.documentElement)
          const foregroundVar = computedStyle.getPropertyValue('--foreground').trim()
          if (foregroundVar.includes('0.95')) { // Dark mode has high lightness
            strokeColor = '#f1f5f9'
          }
        }
        
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = isMobile ? 0.8 : 1 // Thinner lines on mobile
        ctx.stroke(airplanePath)

        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Create paper airplane path using the exact SVG provided
    const createAirplanePath = (size: number) => {
      const path = new Path2D()
      const scale = size / 157 // SVG viewbox width is 157
      
      // Using the exact SVG path provided by the user
      path.moveTo(6.72129 * scale, 53.8326 * scale)
      path.bezierCurveTo(5.22886 * scale, 54.369 * scale, 3.79008 * scale, 55.0461 * scale, 2.42414 * scale, 55.8549 * scale)
      path.bezierCurveTo(1.99492 * scale, 56.0692 * scale, 1.62306 * scale, 56.3841 * scale, 1.33985 * scale, 56.7732 * scale)
      path.bezierCurveTo(1.05664 * scale, 57.1622 * scale, 0.870351 * scale, 57.614 * scale, 0.796627 * scale, 58.0907 * scale)
      path.bezierCurveTo(0.728141 * scale, 58.9623 * scale, 1.18429 * scale, 59.8347 * scale, 2.14826 * scale, 60.6823 * scale)
      path.bezierCurveTo(2.95005 * scale, 61.3417 * scale, 3.81412 * scale, 61.9203 * scale, 4.72808 * scale, 62.4099 * scale)
      path.bezierCurveTo(5.42909 * scale, 62.8132 * scale, 6.14303 * scale, 63.1944 * scale, 6.85696 * scale, 63.575 * scale)
      path.bezierCurveTo(7.87906 * scale, 64.1201 * scale, 8.93607 * scale, 64.6808 * scale, 9.92071 * scale, 65.3035 * scale)
      path.bezierCurveTo(23.2735 * scale, 73.7162 * scale, 35.4245 * scale, 81.1753 * scale, 48.7508 * scale, 87.2021 * scale)
      path.bezierCurveTo(48.7223 * scale, 87.6822 * scale, 48.6907 * scale, 88.1609 * scale, 48.6584 * scale, 88.6377 * scale)
      path.bezierCurveTo(48.5679 * scale, 89.9855 * scale, 48.4749 * scale, 91.3782 * scale, 48.4729 * scale, 92.7533 * scale)
      path.bezierCurveTo(48.4699 * scale, 94.8297 * scale, 48.4618 * scale, 96.9073 * scale, 48.4484 * scale, 98.9863 * scale)
      path.bezierCurveTo(48.4141 * scale, 105.578 * scale, 48.3786 * scale, 112.395 * scale, 48.5989 * scale, 119.098 * scale)
      path.bezierCurveTo(48.6784 * scale, 121.515 * scale, 49.5403 * scale, 123.243 * scale, 51.0256 * scale, 123.964 * scale)
      path.bezierCurveTo(52.5872 * scale, 124.719 * scale, 54.5946 * scale, 124.279 * scale, 56.6783 * scale, 122.719 * scale)
      path.bezierCurveTo(57.4297 * scale, 122.156 * scale, 58.1998 * scale, 121.524 * scale, 59.032 * scale, 120.785 * scale)
      path.bezierCurveTo(62.6824 * scale, 117.545 * scale, 66.3277 * scale, 114.298 * scale, 70.0078 * scale, 111.02 * scale)
      path.lineTo(73.343 * scale, 108.049 * scale)
      path.bezierCurveTo(73.3682 * scale, 108.068 * scale, 73.3927 * scale, 108.087 * scale, 73.4153 * scale, 108.107 * scale)
      path.lineTo(76.4991 * scale, 110.778 * scale)
      path.bezierCurveTo(80.01 * scale, 113.816 * scale, 83.6397 * scale, 116.957 * scale, 87.1829 * scale, 120.08 * scale)
      path.bezierCurveTo(88.1921 * scale, 120.967 * scale, 89.2071 * scale, 121.85 * scale, 90.2279 * scale, 122.727 * scale)
      path.bezierCurveTo(93.3395 * scale, 125.417 * scale, 96.5596 * scale, 128.198 * scale, 99.4515 * scale, 131.179 * scale)
      path.bezierCurveTo(100.984 * scale, 132.756 * scale, 102.474 * scale, 133.498 * scale, 104.264 * scale, 133.498 * scale)
      path.bezierCurveTo(105.036 * scale, 133.487 * scale, 105.803 * scale, 133.372 * scale, 106.546 * scale, 133.158 * scale)
      path.bezierCurveTo(109.158 * scale, 132.442 * scale, 110.843 * scale, 130.835 * scale, 112.011 * scale, 127.954 * scale)
      path.bezierCurveTo(116.411 * scale, 117.096 * scale, 120.915 * scale, 106.068 * scale, 125.269 * scale, 95.4041 * scale)
      path.bezierCurveTo(128.844 * scale, 86.644 * scale, 132.416 * scale, 77.8832 * scale, 135.985 * scale, 69.1212 * scale)
      path.bezierCurveTo(143.674 * scale, 50.3116 * scale, 150.308 * scale, 31.082 * scale, 155.854 * scale, 11.5231 * scale)
      path.bezierCurveTo(156.526 * scale, 9.25442 * scale, 156.998 * scale, 6.93056 * scale, 157.266 * scale, 4.57852 * scale)
      path.bezierCurveTo(157.355 * scale, 4.03355 * scale, 157.322 * scale, 3.47531 * scale, 157.169 * scale, 2.945 * scale)
      path.bezierCurveTo(157.015 * scale, 2.41468 * scale, 156.745 * scale, 1.92589 * scale, 156.379 * scale, 1.51476 * scale)
      path.bezierCurveTo(155.937 * scale, 1.11363 * scale, 155.412 * scale, 0.817045 * scale, 154.841 * scale, 0.646857 * scale)
      path.bezierCurveTo(154.272 * scale, 0.476668 * scale, 153.671 * scale, 0.437215 * scale, 153.083 * scale, 0.531243 * scale)
      path.bezierCurveTo(152.306 * scale, 0.62523 * scale, 151.539 * scale, 0.799482 * scale, 150.796 * scale, 1.05151 * scale)
      path.lineTo(150.696 * scale, 1.08216 * scale)
      path.bezierCurveTo(149.028 * scale, 1.58303 * scale, 147.355 * scale, 2.06949 * scale, 145.682 * scale, 2.5567 * scale)
      path.bezierCurveTo(141.796 * scale, 3.6879 * scale, 137.778 * scale, 4.85757 * scale, 133.878 * scale, 6.19107 * scale)
      path.bezierCurveTo(105.715 * scale, 15.8287 * scale, 77.1517 * scale, 26.3209 * scale, 48.9821 * scale, 37.3766 * scale)
      path.bezierCurveTo(40.8575 * scale, 40.564 * scale, 32.5849 * scale, 43.7787 * scale, 24.5844 * scale, 46.8861 * scale)
      path.bezierCurveTo(18.6266 * scale, 49.1966 * scale, 12.6722 * scale, 51.5121 * scale, 6.72129 * scale, 53.8326 * scale)
      path.closePath()
      
      return path
    }

    // Initialize airplanes
    const initAirplanes = () => {
      if (!canvas || !canvas.width) return // Guard against uninitialized canvas
      
      airplanesRef.current = []
      const isMobile = window.innerWidth < 768
      const numAirplanes = isMobile ? 5 : 10 // Fewer airplanes on mobile
      const dpr = window.devicePixelRatio || 1
      const canvasWidth = canvas.width / dpr
      const canvasHeight = canvas.height / dpr
      
      for (let i = 0; i < numAirplanes; i++) {
        airplanesRef.current.push({
          id: i,
          x: Math.random() * canvasWidth, // Account for device pixel ratio
          y: canvasHeight + Math.random() * 100, // Start slightly below the bottom edge
          speed: isMobile ? 0.5 + Math.random() * 0.8 : 0.5 + Math.random() * 1.5, // More consistent speed on mobile
          size: isMobile ? 24 + Math.random() * 16 : 15 + Math.random() * 25, // Even larger size on mobile
          opacity: isMobile ? 0.6 : 0.7 + Math.random() * 0.3, // Fixed opacity on mobile to prevent flashing
          rotation: Math.PI / 8, // Rotate tip to face top-right direction
          delay: Math.random() * 5000, // Stagger start times
        })
      }
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (initTimeout) {
        clearTimeout(initTimeout)
      }
    }
  }, []) // Remove theme dependency to prevent frequent re-initialization

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 touch-none"
      style={{ 
        display: 'block',
        minHeight: '100%',
        minWidth: '100%',
        opacity: '0.7', // Fixed opacity to prevent mobile flashing
        willChange: 'auto', // Remove will-change to prevent rendering issues on mobile
      }}
      aria-hidden="true"
    />
  )
}
