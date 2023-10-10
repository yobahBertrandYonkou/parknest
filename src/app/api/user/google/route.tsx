import { NextResponse } from "next/server";
import mongoClient from "../../../database/mongodb";

export async function POST(request: Request) {
  // retrieving user data
  let body = (await request.json()) ?? {};

  console.log("here");
  
  // Checking whether user exist
  let status = await mongoClient
  .collection("users")
  .findOne({ email: body.email, userType: body.userType });

// Switching based on method
if (status !== null) {
    // User already exist
    return NextResponse.json({
      status: "ok",
      data: status,
    });
  } else {

    // Save password in database
    let response = await mongoClient
      .collection("users")
      .insertOne({
        ...body,
        password: "",
        method: 'google',
        first_name: "",
        last_name: "",
        phone: "",
        account_details: { account_name: "", account_number: "" },
        identity: {
          type: "",
          photo: ""
        }
      });
    return NextResponse.json({ data: response, status: "success" });
  }
}

