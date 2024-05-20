/** @type {import('next').NextConfig} */
const nextConfig = {};
const proxy = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.API_ENDPOINT}/:path*/`,
				// destination: 'https://14c6-2402-3a80-1e0a-8016-1811-b7e0-e5c8-cc92.ngrok-free.app/:path*/',
			},
		];
	},
};

module.exports = {
	...nextConfig,
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	...proxy,
};
