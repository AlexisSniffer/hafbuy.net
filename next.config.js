/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ]
  },
  images: {
    domains: ['hafbuy-strapi-space.nyc3.digitaloceanspaces.com'],
  },
}

module.exports = nextConfig
