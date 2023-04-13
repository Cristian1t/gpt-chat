/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chat',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/bonus/stream/adventure',
        destination: 'http://localhost:8080/bonus/stream/adventure',
        basePath: false,
      },
      {
        source: '/bonus/adventure',
        destination: 'http://localhost:8080/bonus/adventure',
        basePath: false,
      },
      {
        source: '/bonus/adventure/last/:id',
        destination: 'http://localhost:8080/bonus/adventure/last/:id',
        basePath: false,
      },
      {
        source: '/bonus/text/adventure/:path*',
        destination: 'http://localhost:8080/bonus/text/adventure/:path*',
        basePath: false,
      },
      // {
      //   source: '/bonus/stream/adventure/:path*',
      //   destination: 'http://localhost:8080/bonus/stream/adventure/:path*',
      //   basePath: false,
      // },
    ]
  },
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placekitten.com',
      },
    ],
  },
}

module.exports = nextConfig
