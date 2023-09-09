/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}
const proxy = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'http://127.0.0.1:8000/:path*/',
        destination: 'https://5477-2402-3a80-1e0a-8016-8511-a8d0-263a-dd55.ngrok-free.app/:path*/',
      },
    ];
  },
};


module.exports = {
  ...nextConfig,
  ...proxy,
};
