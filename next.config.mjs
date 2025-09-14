/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optional: যদি public URL বা base path দরকার হয়
    // basePath: '/your-subfolder',
  //   reactStrictMode: true,
  //   trailingSlash: true, // ✅ forces /services/web-design/ instead of /services/web-design
  // output: 'export', // Netlify এর জন্য SPA export

  // images: {
  //   domains: ["drimtuch-server.onrender.com"], // আপনার image domain
  //   // unoptimized: true, // ✅ Static export-compatible
  // },
  images: {
    // remotePatterns: [
    //   { protocol: 'https', hostname: 'drimtuch-server.onrender.com', port: '', pathname: '/**' },
    //   { protocol: 'https', hostname: 'artificialintelligencetelegraph.com', port: '', pathname: '/**' },
    //   { protocol: 'https', hostname: 'itbrief.com.au', port: '', pathname: '/**' },
    //   { protocol: 'https', hostname: 'app.uylab.org', port: '', pathname: '/**' },
    //   { protocol: 'https', hostname: 't4.ftcdn.net', port: '', pathname: '/**' },
    // ],
    unoptimized: true,
  },
  
  
  };
  
  export default nextConfig;
  