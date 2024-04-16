export const conf = {
    APPWRITE_URL:String(process.env.APPWRITE_URL),
    PROJECT_ID:String(process.env.PROJECT_ID),
    DATABASE_ID:String(process.env.DATABASE_ID),
    COLLECTION_ID_BOOKSTORE:String(process.env.COLLECTION_ID_BOOKSTORE),
    COLLECTION_ID_USERDETAILS:String(process.env.COLLECTION_ID_USERDETAILS),
    COLLECTION_ID_ORDERLIST:String(process.env.COLLECTION_ID_ORDERLIST),
    COLLECTION_ID_FEEDBACK:String(process.env.COLLECTION_ID_FEEDBACK),

    BUCKET_ID_IMG:String(process.env.BUCKET_ID_IMG),
    BUCKET_ID_USER:String(process.env.BUCKET_ID_USER),
    
    RAZORPAY_ID:String(process.env.RAZORPAY_ID),
    RAZORPAY_SECRET:String(process.env.RAZORPAY_SECRET),

    RAZORPAY_TEST_ID:String(process.env.RAZORPAY_TEST_ID),
    RAZORPAY_TEST_SECRET:String(process.env.RAZORPAY_TEST_SECRET),

    EMAILHOST:String(process.env.EMAILHOST),
    EMAILUSER:String(process.env.EMAILUSER),
    EMAILPASS:String(process.env.EMAILPASS),
}
