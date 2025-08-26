
/** @type {import('next').NextConfig} */

import { createRequire } from 'node:module';

// const require = createRequire(import.meta.url);
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        // global: require.resolve("global")
      };
    }
    return config;
  },
  // If the package has ES modules issues
  transpilePackages: ['@zama-fhe/relayer-sdk'],
}

export default nextConfig;