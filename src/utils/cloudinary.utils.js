import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config(
    {
        cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
        api_key: `${process.env.CLOUDINARY_API_KEY}`,
        api_secret: `${process.env.CLOUDINARY_API_SECRET}`
    }
);

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        // upload the file on cloudinary
        cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //file has been uploaded successfully
        console.log("file has been uploaded on cloudinary ",response.url);
        
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally saved temp file as the upload operation got failed
        console.log('Cloudinary image upload error occured.. ',error);
        return null;
    }
}

export {uploadOnCloudinary};