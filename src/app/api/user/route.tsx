import { NextResponse } from "next/server";
import mongoClient from "../../database/mongodb";
import { ObjectId } from "mongodb";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/app/database/firebase";

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

export async function PUT(request: Request){
  let formData = await request.formData();

  console.log(formData);

  // Uploading file to firebase storage
  let uploadStatus = await uploadBytes(
    ref(storage, `/users/${(formData.get('userId') as string) + (formData.get('identity_file') as File).name}`), 
    await (formData.get('identity_file') as Blob).arrayBuffer()
  );  
  
  // updating data
  let status = await mongoClient.collection('users').updateOne(
    { _id: new ObjectId(formData.get('userId') as string) },
    {
       $set: {
        first_name: formData.get('first_name')?.toString().trim(),
        last_name: formData.get('last_name')?.toString().trim(),
        phone: parseInt(formData.get('phone') as string),
        account_details: {
          account_number: formData.get('account_number')?.toString().trim(),
          account_name: formData.get('account_name')?.toString().trim()
        },
        identity: {
          type: formData.get('identity_type'),
          photo: await getDownloadURL(uploadStatus.ref)
        }

       }
    }
  );

  return NextResponse.json(status);
}