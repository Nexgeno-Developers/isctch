import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend-lamipak.webtesting.pw',
      },
    ],
  },
};

export default nextConfig;
