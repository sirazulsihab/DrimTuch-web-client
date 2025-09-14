/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optional: যদি public URL বা base path দরকার হয়
    // basePath: '/your-subfolder',
    reactStrictMode: true,
    trailingSlash: true, // ✅ forces /services/web-design/ instead of /services/web-design
  output: 'export', // Netlify এর জন্য SPA export

  images: {
    domains: ["drimtuch-server.onrender.com"], // আপনার image domain
    unoptimized: true, // ✅ Static export-compatible
  },
  };
  
  export default nextConfig;
  