import db from '@/app/api/lib/db';
import RedemptionRepository from '@/app/api/repositories/redemption';
import { parseBody, validateRequired, safeError } from '@/app/api/utils/apiHelpers';
import { enrichRedemption } from '@/app/api/utils/redemptionHelpers';
import { NextResponse } from 'next/server';

// POST /api/redemption - Crear un nuevo codigo de canje
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
    'productName',
    'productImageURL',
  ]);
  if (validationError) return validationError;

  const { productName, productImageURL, productId } = body!;

  try {
    const redemption = await RedemptionRepository.create({
      productName,
      productImageURL,
      productId,
    });
    return NextResponse.json(
      { code: redemption.code, id: redemption._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API Error] POST /api/redemption:', error);
    return safeError('Error al crear el codigo de canje', 500);
  }
}

// GET /api/redemption - Listar todos los codigos (admin)
export async function GET() {
  try {
    await db.connect();
  } catch (error) {
    console.error('[API Error] DB connection failed:', error);
    return safeError('Error de conexion a la base de datos', 500);
  }

  try {
    const redemptions = await RedemptionRepository.getAll();
    const enriched = redemptions.map(enrichRedemption);
    return NextResponse.json(enriched, { status: 200 });
  } catch (error) {
    console.error('[API Error] GET /api/redemption:', error);
    return safeError('Error al obtener los codigos de canje', 500);
  }
}
