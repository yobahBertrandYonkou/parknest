import mongoClient from "../database/mongodb";
import { NextResponse } from "next/server";
import bcrypt, { hash } from 'bcrypt';

export async function POST(request: Request) {
  // Retrieving details sent from front end
  let body = (await request.json()) ?? {};

  console.log(body);

  // Validation
  if (
    !Object.keys(body).includes("password") ||
    !Object.keys(body).includes("email")
  ) {
    return NextResponse.json({
      status: "failed",
      message: "email and password required",
    });
  } else {
    // Checking whether user exist
    let status = await mongoClient
      .collection("users")
      .findOne({ email: body.email, userType: body.userType });

    if (status !== null) {
      // User already exist
      return NextResponse.json({
        status: "failed",
        message: `User already exist. Go to login page`,
      });
    } else {
      // Hashing password before saving
      let hash = bcrypt.hashSync(body.password, 10);
      
      // Save password in database
      let response = await mongoClient.collection("users").insertOne({ ...body, password: hash });
      return NextResponse.json({ ...response, status: 'success' });
      
    }
  }
}
