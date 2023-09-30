import { ObjectId } from "mongodb";
import mongoClient from "../../../database/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // getting data from body
  // let body = (await request.json()) ?? {};
  let params = new URL(request.url).searchParams;

  if (params.get("plotId") === null) {
    return NextResponse.json({
      status: "failed",
      message: "Query string `plotId` is required in the body.",
    });
  }

  // fetching data
  let data = await mongoClient.collection("plots").findOne({
    _id: new ObjectId(params.get("plotId") as string),
  });

  console.log(params);
  
  // returning data
  return NextResponse.json({
    status: "ok",
    data: data,
  });
}