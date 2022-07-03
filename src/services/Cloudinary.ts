const cloudinary = require("cloudinary")
import config from '../config/index'

cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

export const uploadAndGetImageUrl = async (image:any) => {
  const imageUpload = await cloudinary.v2.uploader.upload(image);
  return imageUpload.url;
};