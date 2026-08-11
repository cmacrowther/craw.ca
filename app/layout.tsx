import type React from "react"
import type { Metadata } from "next"
import { Bitter, Bungee, Geist, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { SpeedInsights } from '@vercel/speed-insights/next'
import { homepageDescription, homepageTitle, siteName, siteUrl } from "@/lib/site-metadata"

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

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bungee",
  preload: true,
})

const bitter = Bitter({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
  variable: "--font-bitter",
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  preload: true,
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homepageTitle,
    template: "%s | Colin Crowther",
  },
  description: homepageDescription,
  alternates: {
    canonical: "/",
  },
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
    title: homepageTitle,
    description: homepageDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: homepageTitle,
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: homepageTitle,
    description: homepageDescription,
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
    <html lang="en" className={`dark ${geistSans.variable} ${inter.variable} ${bungee.variable} ${bitter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <head>
        {/* Default theme-color meta for dynamic update */}
        <meta name="theme-color" content="#09090b" />

        {/* Structured Data: Organization/Person */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Colin Crowther',
            url: `${siteUrl}/`,
            sameAs: [
              'https://github.com/cmacrowther',
              'https://gitlab.com/cmacrowther',
              'https://www.linkedin.com/in/colincrowther/',
              'https://hub.docker.com/u/cmacrowther'
            ],
            jobTitle: 'Full-stack Developer',
            image: `${siteUrl}/og-image.png`,
            description: homepageDescription
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
