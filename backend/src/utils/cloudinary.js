import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function savetoCloudinary(localFilepath) {
  //saveing local file to cloudinary
  try {
    if (!localFilepath) return null;
    const res = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilepath); // Delete the local file after upload to Cloudinary
    return res;
  } catch (error) {
    console.error(`Error saving to Cloudinary: ${error.message}`);
    fs.unlinkSync(localFilepath); // Delete local file path if upload fails
    return null;
  }
}

export { savetoCloudinary };
