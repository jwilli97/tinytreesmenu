import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xjzjmufcwryxhopgcvhz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'qrcgcustomers.s3-eu-west-1.amazonaws.com',
        port: '',
        pathname: '/account13454916/**',
      },
      {
        protocol: 'https',
        hostname: 'qrco.de',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
