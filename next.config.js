/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"]
  }
};

module.exports = nextConfig;
