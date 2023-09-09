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
        destination: 'https://14c6-2402-3a80-1e0a-8016-1811-b7e0-e5c8-cc92.ngrok-free.app/:path*/',
      },
    ];
  },
};


module.exports = {
  ...nextConfig,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'ngrok-skip-browser-warning',
            value: '69420', // Your custom ngrok header value
          },
          // Add more custom headers if needed
        ],
      },
    ];
  },
  ...proxy,
};
