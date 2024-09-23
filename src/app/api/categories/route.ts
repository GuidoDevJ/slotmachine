// app/api/protected/route.ts
import db from '@/app/api/lib/db';
import CategoriesRepository from '@/app/api/repositories/categories';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  await db.connect();
  let body = await request.json();

  const { name, imageURL } = body;

  // Validación básica
  if (!name || !imageURL) {
    return NextResponse.json(
      { message: 'Name and imageURL are required' },
      { status: 400 }
    );
  }
  // Crear categoría

  try {
    const newCategory = await CategoriesRepository.createCategory(
      name,
      imageURL
    );
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}

export async function GET(request: Request) {
  await db.connect();

  try {
    const allCategories = await CategoriesRepository.getAllCategories();
    return NextResponse.json(allCategories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
