import mongoClient from "../../database/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
import { storage } from "@/app/database/firebase";
import { URL } from "url";

export async function GET(request: Request) {
  // getting data from body
  // let body = (await request.json()) ?? {};
  let params = new URL(request.url).searchParams as URLSearchParams;

  if (params.get("userId") === null && params.get("userType") === 'po') {
    return NextResponse.json({
      status: "failed",
      message: "Query string `userId` is required in the body.",
    });
  }

  // fetching data
  let data = await mongoClient.collection("plots").find( params.get("userType") === 'po' ? {
    user_id: params.get("userId"),
  } : {});

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
    plot_name: formData.get("name")?.toString().trim(),
    price: formData.get("price"),
    plot_location: JSON.parse(formData.get("location") as string),
    description: formData.get("description")?.toString().trim(),
    capacity: parseInt(formData.get("capacity") as string),
    photos: photoUrls ?? [],
    user_id: formData.get("userId"),
  });

  return NextResponse.json(status);
}

export async function DELETE(request: Request) {
  let body = (await request.json()) as Object;

  console.log(body);

  if (!Object.keys(body).includes("plotId")) {
    return NextResponse.json({
      status: "failed",
      message: "Query string `plotId` is required in the body.",
    });
  }

  // deleting plot photos
  let deleteStatus = await Promise.all(
    (await listAll(ref(storage, `plots/${body["plotId" as keyof Object]}`))).items.map( doc => deleteObject(doc))
  );
  
  console.log(deleteStatus);
  
  // fetching data
  let status = await mongoClient.collection("plots").deleteOne({
    _id: new ObjectId(body["plotId" as keyof Object] as unknown as string),
  });

  console.log(status);

  // returning data
  return NextResponse.json({
    status: "ok",
    data: status,
  });
}

export async function PUT(request: Request) {
  // retrieving data from body
  // let body = (await request.json()) ?? {};

  let formData = await request.formData();
  console.log(formData);

  // Creating plot id to use as image folder
  let plotId = new ObjectId(formData.get("plotId") as string);

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

  // Deleting photos
  let photosToBeDeleted = JSON.parse(
    formData.get("photosToBeDeleted") as string
  ) as string[];
  let deleteStatus = await Promise.all(
    photosToBeDeleted.map((id) => {
      return deleteObject(ref(storage, `plots/${plotId}/${id}`));
    })
  );

  console.log(deleteStatus);

  // saving data to mongodb
  let status = await mongoClient.collection("plots").updateOne(
    { _id: plotId },
    {
      $set: {
        plot_name: formData.get("name")?.toString().trim(),
        price: parseFloat(formData.get("price") as string),
        plot_location: JSON.parse(formData.get("location") as string),
        description: formData.get("description")?.toString().trim(),
        capacity: parseInt(formData.get("capacity") as string),
        photos: [
          ...(photoUrls ?? []),
          ...(JSON.parse(formData.get("photoUrls") as string) as unknown as string[]),
        ],
        user_id: formData.get("userId"),
      },
    }
  );

  return NextResponse.json(status);
}
