/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@hithub/ui", "@hithub/database"],
};

module.exports = nextConfig;
