/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
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