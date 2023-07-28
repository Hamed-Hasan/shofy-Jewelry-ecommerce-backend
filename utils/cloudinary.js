const dotenv = require("dotenv");
const cloudinaryModule = require("cloudinary");
const { secret } = require("../config/secret");

dotenv.config();
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: secret.cloudinary_name,
  api_key: secret.cloudinary_api_key,
  api_secret: secret.cloudinary_api_secret,
});

module.exports = cloudinary;