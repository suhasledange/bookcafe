/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
          {
            protocol: 'https',
            hostname: 'cloud.appwrite.io',
            pathname: '**', 
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '**', 
          },
        ],
      },
};

export default nextConfig;
