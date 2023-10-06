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


export async function GET(request: Request){
    let params = new URL(request.url).searchParams as URLSearchParams;


  if (params.get("userId") === null && params.get("userType") === 'po') {
    return NextResponse.json({
      status: "failed",
      message: "Query string `userId` is required in the body.",
    });
  }

  // fetching data
  let data = await mongoClient.collection("bookings").find({
    user_id: params.get("userId"),
  });

  let dataList: Object[] = [];

  for await (const doc of data) {
    dataList.push(doc);
  }


  // returning data
  return NextResponse.json({
    status: "ok",
    data: dataList,
  });
}