import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/habits",
  assetPrefix: "/habits",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
