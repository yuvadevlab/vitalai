import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@vitalai/ui",
    "@vitalai/shared-types",
    "@yuva-devlab/ui",
    "@yuva-devlab/tokens",
  ],
};

export default nextConfig;
