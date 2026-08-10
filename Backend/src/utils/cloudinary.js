import {v2 as cloudinary} from "cloudinary";
import fs from "fs";    // filesystem
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_CLOUD_SECRET } from "../config/config.js";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_CLOUD_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(localFilePath);
        return response;
    }catch(err){
        fs.unlinkSync(localFilePath); // remove from local if failed
        return null;
    }
}

export {uploadOnCloudinary};