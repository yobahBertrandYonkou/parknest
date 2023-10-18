import razorpay from "@/app/payment/razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    let formData = await request.formData();    
    // creating order
    let status = new Promise<Object>( resolve => {
        razorpay.orders.create({
            amount: parseFloat(formData.get('amount') as string) * 100,
            currency: 'INR',
            receipt: 'order_' + new Date().getTime().toString()
    
        }, (error, order) => {
            // console.log(order);
            
            resolve(order);
        })
    });

    return NextResponse.json(await status);
}