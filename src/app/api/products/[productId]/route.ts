import db from '@/app/api/lib/db';
import ProductsRepository from '@/app/api/repositories/products';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  await db.connect();
  console.log('Hola');
  // Obtener la URL completa
  const url = req.url || '';

  // Extraer el ID de la URL
  const segments = url.split('/'); // Dividir la URL por '/'
  const productId = segments.pop(); // Tomar el último segmento como ID

  // Obtener el cuerpo de la solicitud
  const body = await req.json();
  try {
    // Llamar al método para actualizar el producto
    const updatedProduct = await ProductsRepository.updateOne(
      productId as string,
      body
    );
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  await db.connect();
  // Obtener la URL completa
  const url = req.url || '';

  // Extraer el ID de la URL
  const segments = url.split('/'); // Dividir la URL por '/'
  const productId = segments.pop(); // Tomar el último segmento como ID

  console.log(productId);
  try {
    // Llamar al método para actualizar el producto
    await ProductsRepository.deleteOne(productId as string);
    return NextResponse.json({ status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
