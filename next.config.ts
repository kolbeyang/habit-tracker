import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/habits",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
