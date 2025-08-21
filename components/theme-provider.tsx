'use client'

import * as React from 'react'
import { ThemeColorUpdater } from './theme-color-updater'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider {...props}>
      <ThemeColorUpdater />
      {children}
    </NextThemesProvider>
  )
}
