import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add performance and security headers
  const headers = new Headers(request.headers)
  const response = NextResponse.next({
    request: {
      headers,
    },
  })

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

  // Performance headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  
  // Cache static assets aggressively
  if (request.nextUrl.pathname.startsWith('/_next/static')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Cache images and videos
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|ico|svg|mp4|webm)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
  }

  // Preload critical resources
  if (request.nextUrl.pathname === '/') {
    response.headers.set(
      'Link',
  ''
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
