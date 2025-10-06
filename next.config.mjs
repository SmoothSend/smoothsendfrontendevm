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
};

export default nextConfig;
