import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static caching and compression
  compress: true,
  async redirects() {
    return [
      {
        source: "/skills",
        destination: "/?view=marketplace",
        permanent: false,
      },
      {
        source: "/marketplace",
        destination: "/?view=marketplace",
        permanent: false,
      },
    ];
  },

  // Cache headers for static assets
  async headers() {
    return [
      {
        source: "/figma/:all*(svg|jpg|png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
