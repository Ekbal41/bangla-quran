import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    // Add this block to fix the "heavy" back button
    staleTimes: {
      dynamic: 300, // Keep in memory for 5 minutes
      static: 1800,  // Keep SSG pages for 30 minutes
    },
  },
  // Note: cacheComponents is usually an experimental flag
  experimental: {
    dynamicIO: true, // Required for 'use cache' in 2026
  }
};
export default nextConfig;
