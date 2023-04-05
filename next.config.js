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
