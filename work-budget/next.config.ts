import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl?.startsWith("http")) {
      return [];
    }

    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
