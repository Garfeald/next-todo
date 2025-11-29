import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./app'],
  },
  images: {
    domains: ['via.placeholder.com', 'encrypted-tbn0.gstatic.com'], // Добавьте этот домен
  },
};

export default nextConfig;
