/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://nossidev.run.goorm.site/:path*'
      }
    ]
  }
};

export default nextConfig;
