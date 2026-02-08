// app/api/protected/route.ts
import db from '@/app/api/lib/db';
import ProductsRepository from '@/app/api/repositories/products';
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

  const validationError = validateRequired(body!, [
    'name',
    'description',
    'imageURL',
    'probability',
    'categoryId',
  ]);
  if (validationError) return validationError;

  const { name, imageURL, description, probability, categoryId } = body!;

  if (typeof probability !== 'number' || probability < 0 || probability > 100) {
    return safeError('La probabilidad debe ser un numero entre 0 y 100', 400);
  }

  try {
    const newProduct = await ProductsRepository.createProduct(
      name,
      description,
      imageURL,
      probability,
      categoryId
    );
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('[API Error] POST /api/products:', error);
    return safeError('Error al crear el producto', 500);
  }
}
