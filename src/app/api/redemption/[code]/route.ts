import db from '@/app/api/lib/db';
import RedemptionRepository from '@/app/api/repositories/redemption';
import { safeError } from '@/app/api/utils/apiHelpers';
import { enrichRedemption } from '@/app/api/utils/redemptionHelpers';
import { NextResponse } from 'next/server';

function extractCodeFromUrl(url: string): string | null {
  const segments = new URL(url).pathname.split('/');
  return segments[segments.length - 1] || null;
}

// GET /api/redemption/[code] - Validar un codigo de canje
export async function GET(request: Request) {
  const code = extractCodeFromUrl(request.url);
  if (!code) {
    return safeError('Codigo de canje requerido', 400);
  }

  try {
    await db.connect();
  } catch (error) {
    console.error('[API Error] DB connection failed:', error);
    return safeError('Error de conexion a la base de datos', 500);
  }

  try {
    const redemption = await RedemptionRepository.findByCode(code);
    if (!redemption) {
      return safeError('Codigo de canje no encontrado', 404);
    }
    return NextResponse.json(enrichRedemption(redemption), { status: 200 });
  } catch (error) {
    console.error('[API Error] GET /api/redemption/[code]:', error);
    return safeError('Error al validar el codigo de canje', 500);
  }
}

// PATCH /api/redemption/[code] - Marcar como canjeado
export async function PATCH(request: Request) {
  const code = extractCodeFromUrl(request.url);
  if (!code) {
    return safeError('Codigo de canje requerido', 400);
  }

  try {
    await db.connect();
  } catch (error) {
    console.error('[API Error] DB connection failed:', error);
    return safeError('Error de conexion a la base de datos', 500);
  }

  try {
    const redemption = await RedemptionRepository.redeem(code);
    return NextResponse.json(enrichRedemption(redemption), { status: 200 });
  } catch (error: any) {
    console.error('[API Error] PATCH /api/redemption/[code]:', error);
    const message = error?.message || 'Error al canjear el codigo';
    const status = message.includes('no encontrado')
      ? 404
      : message.includes('ya fue canjeado')
        ? 409
        : message.includes('ha expirado')
          ? 410
          : 500;
    return safeError(message, status);
  }
}
