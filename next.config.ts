import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Required to fix the build error for 'use cache'
    
    cacheComponents: true,
    viewTransition: true,
    // Fixes the "heavy" back-button by keeping the list in browser memory
    staleTimes: {
      dynamic: 300, 
      static: 1800,
    },
  },
};

export default nextConfig;
