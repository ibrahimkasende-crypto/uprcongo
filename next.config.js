/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qgsslaearcbkmyoqzhmu.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/images/**",
        search: "?v=*",
      },
      {
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;