"use client"

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: any
  }
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Core Web Vitals reporting
      const reportWebVitals = (metric: any) => {
        if (window.gtag) {
          window.gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
          })
        }
      }

      // Monitor loading performance
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            reportWebVitals({
              name: 'LCP',
              value: entry.startTime,
              id: 'lcp',
            })
          }
          if (entry.entryType === 'first-input') {
            reportWebVitals({
              name: 'FID',
              value: (entry as any).processingStart - entry.startTime,
              id: 'fid',
            })
          }
        })
      })

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] })
      } catch (e) {
        // Observer not supported
      }

      // CLS monitoring
      let clsValue = 0
      let clsEntries: PerformanceEntry[] = []
      
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            const firstSessionEntry = clsEntries[0]
            const lastSessionEntry = clsEntries[clsEntries.length - 1]

            if (!firstSessionEntry || entry.startTime - lastSessionEntry.startTime < 1000) {
              clsEntries.push(entry)
              clsValue += (entry as any).value
            } else {
              reportWebVitals({
                name: 'CLS',
                value: clsValue,
                id: 'cls',
              })
              clsEntries = [entry]
              clsValue = (entry as any).value
            }
          }
        })
      })

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        // Observer not supported
      }

      // Report final CLS on page unload
      const reportFinalCLS = () => {
        if (clsValue > 0) {
          reportWebVitals({
            name: 'CLS',
            value: clsValue,
            id: 'cls',
          })
        }
      }

      window.addEventListener('beforeunload', reportFinalCLS)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          reportFinalCLS()
        }
      })

      return () => {
        observer.disconnect()
        clsObserver.disconnect()
        window.removeEventListener('beforeunload', reportFinalCLS)
      }
    }
  }, [])

  return null
}
