/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reactapp.kgkrealty.com",
        pathname: "/ashportfolio/wp-content/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;