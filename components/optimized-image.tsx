"use client"

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  quality?: number
  loading?: 'lazy' | 'eager'
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  quality = 85,
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Provide default dimensions for images when not specified
  const imageWidth = fill ? undefined : (width || 800)
  const imageHeight = fill ? undefined : (height || 600)

  // Extract object-fit related classes from className to apply to Image
  const objectFitClasses = className.match(/object-\w+/g)?.join(' ') || ''
  const wrapperClasses = className.replace(/object-\w+/g, '').trim()

  return (
    <div className={`relative ${isLoading ? 'animate-pulse bg-muted' : ''} ${fill ? 'w-full h-full' : wrapperClasses}`}>
      <Image
        src={hasError ? "/placeholder.svg" : src}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        fill={fill}
        priority={priority}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        quality={quality}
        loading={loading}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${objectFitClasses}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (!hasError) {
             setHasError(true)
             // Keep loading true until fallback loads?
             // Actually, next/image onError fires when the image fails.
             // We switch src, which triggers a new load.
             // So we should probably keep isLoading true or let the new load handle it.
             // But for simplicity, let's just switch src.
          }
          setIsLoading(false)
        }}
        {...props}
      />
    </div>
  )
}
