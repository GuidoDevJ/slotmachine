import db from '@/app/api/lib/db';
import ProductsRepository from '@/app/api/repositories/products';
import { extractIdFromUrl, parseBody, safeError } from '@/app/api/utils/apiHelpers';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const { id: productId, error: idError } = extractIdFromUrl(req.url);
  if (idError) return idError;

  try {
    await db.connect();
  } catch (error) {
    console.error('[API Error] DB connection failed:', error);
    return safeError('Error de conexion a la base de datos', 500);
  }

  const { data: body, error: parseError } = await parseBody(req);
  if (parseError) return parseError;

  try {
    const updatedProduct = await ProductsRepository.updateOne(
      productId as string,
      body!
    );
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('[API Error] PATCH /api/products/[productId]:', error);
    return safeError('Error al actualizar el producto', 500);
  }
}

export async function DELETE(req: Request) {
  const { id: productId, error: idError } = extractIdFromUrl(req.url);
  if (idError) return idError;

  try {
    await db.connect();
  } catch (error) {
    console.error('[API Error] DB connection failed:', error);
    return safeError('Error de conexion a la base de datos', 500);
  }

  try {
    await ProductsRepository.deleteOne(productId as string);
    return NextResponse.json(
      { msg: `El producto ${productId} ha sido eliminado` },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API Error] DELETE /api/products/[productId]:', error);
    return safeError('Error al eliminar el producto', 500);
  }
}
