/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API: config.API,
    NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
  },
};

module.exports = nextConfig;
