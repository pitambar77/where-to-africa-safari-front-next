/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  allowedDevOrigins: ["whereto.africa"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
   async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination:
          "https://where-to-africa-safari-backend.whereto.africa/sitemap.xml",
      },
      {
        source: "/api/:path*",
        destination: "https://where-to-africa-safari-backend.whereto.africa/api/:path*",
      },
    ];
  },

};

export default nextConfig;
