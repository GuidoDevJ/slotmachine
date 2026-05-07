// app/api/protected/route.ts
import db from '@/app/api/lib/db';
import CategoriesRepository from '@/app/api/repositories/categories';
import { parseBody, validateRequired, safeError } from '@/app/api/utils/apiHelpers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await db.connect();
  } catch (error) {
    console.error('[API Error] DB connection failed:', error);
    return safeError('Error de conexion a la base de datos', 500);
  }

  const { data: body, error: parseError } = await parseBody(request);
  if (parseError) return parseError;

  const validationError = validateRequired(body!, ['name', 'imageURL']);
  if (validationError) return validationError;

  const { name, imageURL } = body!;

  try {
    const newCategory = await CategoriesRepository.createCategory(
      name,
      imageURL
    );
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('[API Error] POST /api/categories:', error);
    return safeError('Error al crear la categoria', 500);
  }
}

export async function GET(request: Request) {
  try {
    await db.connect();
  } catch (error) {
    console.error('[API Error] DB connection failed:', error);
    return safeError('Error de conexion a la base de datos', 500);
  }

  try {
    const allCategories = await CategoriesRepository.getAllCategories();
    return NextResponse.json(allCategories, { status: 200 });
  } catch (error) {
    console.error('[API Error] GET /api/categories:', error);
    return safeError('Error al obtener las categorias', 500);
  }
}
