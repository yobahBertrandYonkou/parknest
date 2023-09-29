import mongoClient from "../../../database/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/app/database/firebase";

export async function POST(request: Request){
    // retrieving data from body
    // let body = (await request.json()) ?? {};
    let formData = await request.formData();
    console.log(formData);

    // Creating plot id to use as image folder
    let plotId = new ObjectId();

    // Uploading data
    let index = 0;
    let photoIds: string[] = formData.get('photoIds')?.toString().split(',') as string[];
    let photosFiles = formData.getAll('files');

    let response = await Promise.all(
        photoIds.map(async (photoId, index) => {
            const fileRef = ref(storage, `plots/${plotId}/${photoId}`);
            return uploadBytes(fileRef, await (photosFiles[index] as Blob).arrayBuffer())
        })
    );

    // Getting photo urls
    let photoUrls = await Promise.all(
        response.map(async (snapshot) => {
            return getDownloadURL(snapshot.ref);
        })
    );

    // saving data to mongodb
    let status = await mongoClient.collection('plots').insertOne({
        _id: plotId,
        plot_name: formData.get('name'),
        price: formData.get('price'),
        plot_location: formData.get('location'),
        description: formData.get('description'),
        capacity: formData.get('capacity'),
        photos: photoUrls,
        user_id: '',
    });

    return NextResponse.json(status);

    
    
}