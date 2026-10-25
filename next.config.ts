import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "web.poecdn.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.poe2db.tw", pathname: "/image/**" },
    ],
  },
};

export default nextConfig;
