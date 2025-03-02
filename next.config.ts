import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.NODE_ENV === "production" ? "/habits" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
