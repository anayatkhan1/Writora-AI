/** @type {import('next').NextConfig} */
const nextConfig = {
	// Increase the server timeout for API routes and server actions
	experimental: {
		serverActions: {
			// 5 minutes timeout for server actions
			bodySizeLimit: "50mb",
			allowedOrigins: ["localhost:3000", "writora.xyz", "www.writora.xyz"],
			// Increase timeout for server actions
			serverActionsTimeout: 300000, // 5 minutes in milliseconds
		},
	},
	api: {
		// 5 minutes timeout for API routes
		responseLimit: false,
		bodyParser: {
			sizeLimit: "50mb",
		},
		// Increase timeout for API routes
		externalResolver: true,
	},
	// Add production-specific optimizations
	productionBrowserSourceMaps: false, // Disable source maps in production for better performance
	poweredByHeader: false, // Remove the X-Powered-By header for security
	// Increase general timeout
	httpTimeout: 300000, // 5 minutes in milliseconds
};

export default nextConfig;
