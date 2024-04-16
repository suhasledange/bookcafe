/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APPWRITE_URL: process.env.APPWRITE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    DATABASE_ID: process.env.DATABASE_ID,
    COLLECTION_ID_BOOKSTORE: process.env.COLLECTION_ID_BOOKSTORE,
    COLLECTION_ID_USERDETAILS: process.env.COLLECTION_ID_USERDETAILS,
    COLLECTION_ID_ORDERLIST: process.env.COLLECTION_ID_ORDERLIST,
    COLLECTION_ID_ORDERLIST: process.env.COLLECTION_ID_ORDERLIST,
    COLLECTION_ID_FEEDBACK:process.env.COLLECTION_ID_FEEDBACK,
    BUCKET_ID_IMG: process.env.BUCKET_ID_IMG,
    BUCKET_ID_USER: process.env.BUCKET_ID_USER,
    RAZORPAY_ID: process.env.RAZORPAY_ID,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
    RAZORPAY_TEST_ID: process.env.RAZORPAY_TEST_ID,
    RAZORPAY_TEST_SECRET: process.env.RAZORPAY_TEST_SECRET,
    EMAILHOST: process.env.EMAILHOST,
    EMAILUSER: process.env.EMAILUSER,
    EMAILPASS: process.env.EMAILPASS,
},
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
