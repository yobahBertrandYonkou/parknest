import razorpay from "@/app/payment/razorpay";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request){

    // creating order
    let status = new Promise<Object>( resolve => {
        razorpay.orders.create({
            amount: 50000,
            currency: 'INR',
            receipt: 'order_' + new Date().getTime().toString()
    
        }, (error, order) => {
            // console.log(order);
            
            resolve(order);
        })
    });

    return NextResponse.json(await status);
    
}