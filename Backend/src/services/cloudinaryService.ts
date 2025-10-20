import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API as string,
  api_secret: process.env.CLOUD_SECRET as string,
});

export const uploadOnCloud = async (localFilePath: string) => {
    try {
        if(!localFilePath) return null;
        const imageURL = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'image'
        });
        return imageURL.url;
    } catch (e) {
        console.error("error while uploading image:", e );
        return null;
    } finally {
        fs.unlinkSync(localFilePath);
    }
};