/** @type {import('next').NextConfig} */
// firebasestorage.googleapis.com
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**'
      }
    ]
  }

};

export default nextConfig;
