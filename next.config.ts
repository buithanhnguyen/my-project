import type { NextConfig } from "next";
// import path from "path";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  reactStrictMode: true,
};

export default nextConfig;
