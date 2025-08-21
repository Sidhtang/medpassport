/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  webpack(config) {
    // Support for larger file sizes
    config.performance = {
      ...config.performance,
      maxAssetSize: 1024 * 1024 * 10, // 10MB
      maxEntrypointSize: 1024 * 1024 * 10, // 10MB
    };
    return config;
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: '10mb',
  },
};

module.exports = nextConfig;
