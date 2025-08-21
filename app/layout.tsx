import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from '@vercel/speed-insights/next'

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  preload: false, // Don't preload to reduce initial load
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: false, // Don't preload to reduce initial load
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cmacrowther.com'),
  title: "Colin Crowther - Developer Portfolio",
  description:
    "Full-stack developer and software engineer portfolio showcasing modern web applications and innovative projects.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Colin Crowther - Developer Portfolio',
    description: 'Full-stack developer and software engineer portfolio showcasing modern web applications and innovative projects.',
    url: 'https://cmacrowther.com', // Update this with your actual domain
    siteName: 'Colin Crowther Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Colin Crowther - Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colin Crowther - Developer Portfolio',
    description: 'Full-stack developer and software engineer portfolio showcasing modern web applications and innovative projects.',
    images: ['/og-image.png'],
  },
  other: {
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Canonical URL for SEO */}
        <link rel="canonical" href="https://cmacrowther.com/" />

        {/* Structured Data: Organization/Person */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Colin Crowther',
            url: 'https://cmacrowther.com/',
            sameAs: [
              'https://github.com/cmacrowther',
              'https://gitlab.com/cmacrowther',
              'https://www.linkedin.com/in/colincrowther/',
              'https://hub.docker.com/u/cmacrowther'
            ],
            jobTitle: 'Full-stack Developer',
            image: 'https://cmacrowther.com/og-image.png',
            description: 'Full-stack developer and software engineer portfolio showcasing modern web applications and innovative projects.'
          })
        }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
              
              // Set mobile viewport height for iOS Safari (simplified)
              try {
                function setVH() {
                  const vh = window.innerHeight * 0.01;
                  document.documentElement.style.setProperty('--vh', vh + 'px');
                }
                if (typeof window !== 'undefined') {
                  setVH();
                  window.addEventListener('resize', setVH, { passive: true });
                  window.addEventListener('orientationchange', () => {
                    // Delay to ensure viewport has settled
                    setTimeout(setVH, 100);
                  }, { passive: true });
                  
                  // iOS-specific: Update on scroll events that might change viewport
                  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                    let timeoutId;
                    window.addEventListener('scroll', () => {
                      clearTimeout(timeoutId);
                      timeoutId = setTimeout(setVH, 50);
                    }, { passive: true });
                    
                    // Also update on focus/blur which can trigger address bar changes
                    window.addEventListener('focusin', setVH, { passive: true });
                    window.addEventListener('focusout', setVH, { passive: true });
                  }
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
