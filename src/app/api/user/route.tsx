import { NextResponse } from "next/server";
import mongoClient from "../../database/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  // retrieving user data
  let body = (await request.json()) ?? {};

  console.log("here");
  
  // Validation
  if (!Object.keys(body).includes("userId")) {
    return NextResponse.json({
      status: "failed",
      message: "userId missing from request body.",
    });
  } else {
    // Fetching user data
    let userData = await mongoClient
      .collection("users")
      .findOne({ _id: new ObjectId(body.userId) });

    // deleting password from object
    if (userData !== null){
      delete userData['password'];
      return NextResponse.json({
        status: 'ok',
        data: userData
    })
    }else{
      return NextResponse.json({
        status: 'failed',
        message: "User not found."
    })
    }

    
  }
}
