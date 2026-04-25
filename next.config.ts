import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      ...(process.env.NODE_ENV !== "production"
        ? [{ protocol: "https" as const, hostname: "picsum.photos" }]
        : []),
    ],
  },
};

export default nextConfig;