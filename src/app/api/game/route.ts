import db from '@/app/api/lib/db';
import GameRepository from '@/app/api/repositories/gameRepositories';
import { parseBody, safeError } from '@/app/api/utils/apiHelpers';
import mongoose from 'mongoose';
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

  if (!body!.categoriesSelected || !Array.isArray(body!.categoriesSelected)) {
    return safeError('categoriesSelected es requerido y debe ser un array', 400);
  }

  // Convertir los IDs a ObjectId
  const transformedCategories = body!.categoriesSelected.map(
    (category: any) => ({
      categoryId: category.categoryId,
      products: category.products.map(
        (productId: string) => new mongoose.Types.ObjectId(productId)
      ),
    })
  );
  // Obtener la fecha actual de Argentina (UTC-3)
  const argentinaTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Argentina/Buenos_Aires',
  });
  const lastUpdated = new Date(argentinaTime); // Convertir la fecha en objeto Date
  try {
    const newSetting = await GameRepository.createGameSettings({
      categoriesSelected: transformedCategories,
      lastUpdated,
    } as any);
    return NextResponse.json(newSetting, { status: 201 });
  } catch (error) {
    console.error('[API Error] POST /api/game:', error);
    return safeError('Error al crear la configuracion del juego', 500);
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
    const lastSetting = await GameRepository.getLastGameConfig();
    return NextResponse.json(lastSetting, { status: 200 });
  } catch (error) {
    console.error('[API Error] GET /api/game:', error);
    return safeError('Error al obtener la configuracion del juego', 500);
  }
}
