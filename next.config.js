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
  experimental: {
    serverComponentsExternalPackages: ['sharp']
  }
};

module.exports = nextConfig;
