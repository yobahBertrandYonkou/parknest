import mongoClient from "../database/mongodb";
import { NextResponse } from "next/server";
import bcrypt, { hash } from "bcrypt";

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

    // Switching based on method
    if (body.method === "signup") {
      if (status !== null) {
        // User already exist
        return NextResponse.json({
          status: "failed",
          message: `User already exist. Go to login page.`,
        });
      } else {
        // Hashing password before saving
        let hash = bcrypt.hashSync(body.password, 10);

        // Save password in database
        let response = await mongoClient
          .collection("users")
          .insertOne({
            ...body,
            password: hash,
            first_name: "",
            method: 'email',
            last_name: "",
            phone: "",
            account_details: { account_name: "", account_number: "" },
            identity: {
              type: "",
              photo: ""
            }
          });
        return NextResponse.json({ ...response, status: "success" });
      }
    } else {
      if (status === null) {
        // User does not exist
        return NextResponse.json({
          status: "failed",
          message: `User not found. Please sign up.`,
        });
      } else {
        // Hashing password before saving
        let passwordCheckStatus = bcrypt.compareSync(
          body.password,
          status.password
        );

        if (passwordCheckStatus) {
          delete status["password"];
          console.log(status);
          
          return NextResponse.json({ ...status, status: "success" });
        } else {
          return NextResponse.json({
            status: "failed",
            message: `Invalid email or password.`,
          });
        }
      }
    }
  }
}
