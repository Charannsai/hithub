/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@hithub/ui", "@hithub/database", "lucide-react"],
};

module.exports = nextConfig;
