import mongoClient from "../../../database/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    let formData = await request.formData();

    // saving booking details
    let status = await mongoClient.collection('bookings').insertOne({
        user_id: formData.get('userId'),
        plot_id: formData.get('plotId'),
        number_of_spots: parseInt(formData.get('number_of_spots') as string),
        time_of_arrival: formData.get('time_of_arrival'),
        payment_detials: JSON.parse(formData.get('payment_details') as string),
        timestamp: formData.get('timestamp'),
        duration: parseInt(formData.get('duration') as string),
        total_price: parseFloat(formData.get('total_price') as string)
    });
    
    console.log();

    return NextResponse.json(status);
    
}