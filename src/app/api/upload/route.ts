// src/app/api/upload/route.ts

import cloudinary from '@/utils/cloudinary';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Especifica el runtime si es necesario

export async function POST(req: Request) {
  try {
    // Parsear el formData de la solicitud
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No se encontró el archivo' },
        { status: 400 }
      );
    }

    // Convertir el archivo a un buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('soy el buffer ============>', buffer);

    // Subir el archivo a Cloudinary usando upload_stream
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(buffer);
    });

    // Responder con la URL de la imagen subida
    return NextResponse.json({ url: uploadResult.secure_url }, { status: 200 });
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
    return NextResponse.json(
      { error: 'Error al subir la imagen a Cloudinary' },
      { status: 500 }
    );
  }
}
