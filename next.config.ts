import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure for /shop subdirectory deployment
  basePath: process.env.NODE_ENV === "production" ? "/shop" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/shop" : "",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Output standalone for self-hosting
  output: "standalone",
};

export default nextConfig;
