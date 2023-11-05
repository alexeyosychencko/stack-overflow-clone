/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      },
      {
        protocol: "http",
        hostname: "*"
      }
    ]
  }
};

module.exports = nextConfig;
