/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/v2', destination: '/' },
    ];
  },
};

export default nextConfig;
