/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["reqres.in", "placekitten.com"],
  },
};

module.exports = nextConfig;
