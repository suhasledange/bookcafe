import { conf } from "@/app/util/conf";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const instance = new Razorpay({
    key_id: conf.RAZORPAY_TEST_ID,
    key_secret: conf.RAZORPAY_TEST_SECRET,
  });


export async function POST(req) {

    const {
        amount,
        userId,
        pId,
        name,
        email,
        contact,
        address,
        paymentFor
    } = await req.json();


    const payment_capture = 1;
    const currency = "INR";

    const options = {
        amount: (amount).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            paymentFor: paymentFor,
            userId: userId,
            productId: pId,
            userName:name,
            userEmail:email,
            phone:contact,
            address:address
        }
    };

   const order = await instance.orders.create(options);
   
  return NextResponse.json({ msg: "success",order });
}
