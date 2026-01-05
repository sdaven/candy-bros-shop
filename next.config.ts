import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    basePath: "",
    assetPrefix: "",

    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },

    output: "standalone",
  };

  export default nextConfig;
