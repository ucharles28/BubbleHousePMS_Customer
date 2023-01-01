/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// module.exports = nextConfig
module.exports = {
  options: {
    case: 'insentive',
    swcMinify: false
  },
}