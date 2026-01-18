import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
    viewTransition: true,
    staleTimes: {
      dynamic: 300,
      static: 1800,
    },
  },
};

export default nextConfig;
