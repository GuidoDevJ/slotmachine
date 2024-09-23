// lib/cloudinary.js

import { v2 as cloudinary } from 'cloudinary';
// Configurar Cloudinary con las variables de entorno
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
