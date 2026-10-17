import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@vitalai/ui",
    "@vitalai/shared-types",
    "@vitalai/validation",
    "@vitalai/constants",
    "@yuva-devlab/ui",
    "@yuva-devlab/tokens",
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
