import ProductsRepository from '@/app/api/repositories/products';
import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function GET(req: Request) {
  await db.connect();
  // Obtener la URL completa
  const url = req.url || '';

  // Extraer el ID de la URL
  const segments = url.split('/'); // Dividir la URL por '/'
  const categoryID = segments.pop(); // Tomar el último segmento como ID
  try {
    // Llamar al método para actualizar el producto
    const updatedProduct = await ProductsRepository.getAllByCategoryId(
      categoryID as string
    );
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
