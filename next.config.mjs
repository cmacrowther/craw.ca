/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // A static export has no Next.js image optimization server. The source
    // images are already appropriately sized and Cloudflare caches them.
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
    ],
  },
  trailingSlash: false,
}

export default nextConfig
