import mongoClient from "../../database/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/app/database/firebase";
import { URL } from "url";

export async function GET(request: Request) {
  // getting data from body
  // let body = (await request.json()) ?? {};
  let params = new URL(request.url).searchParams as URLSearchParams;

  if (params.get("userId") === null) {
    return NextResponse.json({
      status: "failed",
      message: "Query string `userId` is required in the body.",
    });
  }

  // fetching data
  let data = await mongoClient.collection("plots").find({
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

export async function POST(request: Request) {
  // retrieving data from body
  // let body = (await request.json()) ?? {};

  let formData = await request.formData();
  console.log(formData);

  // Creating plot id to use as image folder
  let plotId = new ObjectId();

  // Uploading data
  let index = 0;
  let photoUrls = null;
  let photosFiles = formData.getAll("files");

  if (photosFiles.length != 0) {
    let photoIds: string[] = formData
      .get("photoIds")
      ?.toString()
      .split(",") as string[];

    let response = await Promise.all(
      photoIds.map(async (photoId, index) => {
        const fileRef = ref(storage, `plots/${plotId}/${photoId}`);
        return uploadBytes(
          fileRef,
          await (photosFiles[index] as Blob).arrayBuffer()
        );
      })
    );

    // Getting photo urls
    photoUrls = await Promise.all(
      response.map(async (snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
    );
  }

  // saving data to mongodb
  let status = await mongoClient.collection("plots").insertOne({
    _id: plotId,
    plot_name: formData.get("name"),
    price: formData.get("price"),
    plot_location: JSON.parse(formData.get("location") as string),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    photos: photoUrls ?? [],
    user_id: formData.get("userId"),
  });

  return NextResponse.json(status);
}
