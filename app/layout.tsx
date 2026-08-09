import type React from "react"
import type { Metadata } from "next"
import { Geist, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { SpeedInsights } from '@vercel/speed-insights/next'

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
  preload: true,
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cmacrowther.com'),
  title: "Colin Crowther - Developer Portfolio",
  description:
    "Full-stack developer and software engineer portfolio showcasing modern web applications and innovative projects.",
  alternates: {
    canonical: "/",
  },
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
    <html lang="en" className={`dark ${geistSans.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
      <head>
        {/* Default theme-color meta for dynamic update */}
        <meta name="theme-color" content="#09090b" />

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
      </head>
      <body className="antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
