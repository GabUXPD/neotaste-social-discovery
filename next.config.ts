import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: blob: *.tile.openstreetmap.org *.openstreetmap.org",
              "frame-src www.openstreetmap.org openstreetmap.org",
              "connect-src 'self' *.tile.openstreetmap.org",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
