"use client"

import { lazy, Suspense, ComponentType } from 'react'

interface LazyLoadWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
  minHeight?: string | number
}

export function LazyLoadWrapper({ 
  children, 
  fallback, 
  className = '',
  minHeight = '200px'
}: LazyLoadWrapperProps) {
  const defaultFallback = (
    <div 
      className={`animate-pulse bg-muted rounded-lg flex items-center justify-center ${className}`}
      style={{ minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }}
    >
      <div className="text-muted-foreground">Loading...</div>
    </div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}

export function lazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFn)
  
  return function WrappedLazyComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback || <div className="animate-pulse bg-muted rounded-lg h-32" />}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}
