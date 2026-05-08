// src/app/api/upload/route.ts

import cloudinary from '@/utils/cloudinary';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Especifica el runtime si es necesario

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

export async function POST(req: Request) {
  try {
    // Parsear el formData de la solicitud
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No se encontro el archivo' },
        { status: 400 }
      );
    }

    // Validar tipo MIME
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipo de archivo no permitido: ${file.type}. Tipos permitidos: ${ALLOWED_MIME_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validar tamano del archivo
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `El archivo excede el tamano maximo de 5MB (tamano: ${(file.size / 1024 / 1024).toFixed(2)}MB)` },
        { status: 400 }
      );
    }

    // Convertir el archivo a un buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Subir el archivo a Cloudinary usando upload_stream
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          quality: 'auto:best', // Optimizacion automatica de calidad
          fetch_format: 'auto', // Usar el formato adecuado (por ejemplo, WebP)
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
    console.error('[API Error] POST /api/upload:', error);
    return NextResponse.json(
      { error: 'Error al subir la imagen. Verifique el archivo e intente nuevamente.' },
      { status: 500 }
    );
  }
}
