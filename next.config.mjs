/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    minimumCacheTTL: 2592000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
    ],
  },
  serverExternalPackages: ['three'],
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  trailingSlash: false,
  async headers() {
    const securityHeaders = [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
    ]

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/:path*.:ext(woff2|jpg|jpeg|png|gif|webp|avif|ico|svg|mp4|webm|glb)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
}

export default nextConfig
