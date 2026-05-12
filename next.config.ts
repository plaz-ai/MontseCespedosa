import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "montsecespedosa.com",
      },
    ],
  },
};

export default nextConfig;
