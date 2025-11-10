// frontend/next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a standalone build (used in Docker image)
  output: "standalone",

  // Skip ESLint checks during build (auto-generated Prisma code may cause warnings)
  eslint: { ignoreDuringBuilds: true },

  // Skip TypeScript build errors (temporary measure until strict types are fixed)
  typescript: { ignoreBuildErrors: false },

  // Only proxy backend-owned routes; keep Next.js API routes (e.g., /api/auth/*) local
  async rewrites() {
    return [
      { source: "/api/health",              destination: "http://backend:8000/health" },
      { source: "/api/health/:path*",       destination: "http://backend:8000/health/:path*" },
      { source: "/api/tasks",               destination: "http://backend:8000/tasks/" },
      { source: "/api/tasks/:path*",        destination: "http://backend:8000/tasks/:path*" },
      { source: "/api/upload",              destination: "http://backend:8000/upload" },
      { source: "/api/transitions",         destination: "http://backend:8000/transitions" },
      { source: "/api/fonts",               destination: "http://backend:8000/fonts" },
      { source: "/api/fonts/:path*",        destination: "http://backend:8000/fonts/:path*" },
    ];
  },
};

export default nextConfig;
