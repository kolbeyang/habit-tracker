import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/habits",
  assetPrefix: "/habits", // Ensures static files are correctly resolved
};

export default nextConfig;
