/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    domains: ['localhost', 'hafbuy-strapi-space.nyc3.digitaloceanspaces.com', 'hafbuy-strapi-space.nyc3.cdn.digitaloceanspaces.com'],
  },
}

module.exports = nextConfig
