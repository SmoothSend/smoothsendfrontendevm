/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress hydration warnings caused by browser extensions
  reactStrictMode: true,

  // Configure output file tracing to silence the warning
  outputFileTracingRoot: process.cwd(),

  // Experimental features for better hydration
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  async redirects() {
    return [
      // Redirect non-www to www to consolidate link equity
      {
        source: "/:path*",
        has: [{ type: "host", value: "smoothsend.xyz" }],
        destination: "https://www.smoothsend.xyz/:path*",
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
};

export default nextConfig;
