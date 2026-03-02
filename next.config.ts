import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      { source: '/cart', destination: '/contact-us', permanent: true },
      { source: '/checkout', destination: '/contact-us', permanent: true },
      { source: '/cart-2', destination: '/contact-us', permanent: true },
      { source: '/checkout-2', destination: '/contact-us', permanent: true },
      { source: '/wp-admin', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
