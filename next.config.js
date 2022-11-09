/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  images: {
    domains: ['localhost', 'api.supplinx.com'],
  },
}

module.exports = nextConfig
