import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["@roboticela/devkit"],
  experimental: {
    // Premium packages are installed dynamically under @roboticela/premium-*
    externalDir: true,
  },
};

export default nextConfig;
