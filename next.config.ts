import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true, // ⬅️ Tambahkan ini
  },
};

export default nextConfig;
