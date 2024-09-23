// app/api/protected/route.ts
import db from '@/app/api/lib/db';
import ProductsRepository from '@/app/api/repositories/products';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  await db.connect();
  let body = await request.json();

  const { name, imageURL, description, probability, categoryId } = body;
  try {
    const newProduct = await ProductsRepository.createProduct(
      name,
      description,
      imageURL,
      probability,
      categoryId
    );
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.log('Hola', error);

    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
