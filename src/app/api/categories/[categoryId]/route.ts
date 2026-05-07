import ProductsRepository from '@/app/api/repositories/products';
import { extractIdFromUrl, safeError } from '@/app/api/utils/apiHelpers';
import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function GET(req: Request) {
  const { id: categoryID, error: idError } = extractIdFromUrl(req.url);
  if (idError) return idError;

  try {
    await db.connect();
  } catch (error) {
    console.error('[API Error] DB connection failed:', error);
    return safeError('Error de conexion a la base de datos', 500);
  }

  try {
    const updatedProduct = await ProductsRepository.getAllByCategoryId(
      categoryID as string
    );
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('[API Error] GET /api/categories/[categoryId]:', error);
    return safeError('Error al obtener los productos de la categoria', 500);
  }
}
