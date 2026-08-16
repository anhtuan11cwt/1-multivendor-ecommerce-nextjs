/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "res.cloudinary.com",
				pathname: "/**",
				protocol: "https",
			},
		],
	},
	/* tùy chọn cấu hình tại đây */
	reactCompiler: true,
};

export default nextConfig;
