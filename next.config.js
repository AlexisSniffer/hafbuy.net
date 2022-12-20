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
    domains: [
      'localhost',
      'd-themes.com',
      'hafbuy-app-ps9eq.ondigitalocean.app',
    ],
  },
}

module.exports = nextConfig
