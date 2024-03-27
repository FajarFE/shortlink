/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			allowedOrigins: ["shortlink.test:3000"],
		},
	},
	images: {
		domains: ["avatars.githubusercontent.com"],
	},
};

export default nextConfig;
