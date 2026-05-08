import GameRepository from '@/app/api/repositories/gameRepositories';
import { extractIdFromUrl, parseBody, safeError } from '@/app/api/utils/apiHelpers';
import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function DELETE(request: Request) {
  const { id: categoryID, error: idError } = extractIdFromUrl(request.url);
  if (idError) return idError;

  try {
    await db.connect();
  } catch (error) {
    console.error('[API Error] DB connection failed:', error);
    return safeError('Error de conexion a la base de datos', 500);
  }

  try {
    await GameRepository.deleteGameConfig(categoryID as string);
    return NextResponse.json(
      {
        msg: `El category id ${categoryID} has been deleted`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API Error] DELETE /api/game/[categoryId]:', error);
    return safeError('Error al eliminar la configuracion del juego', 500);
  }
}

export async function PATCH(request: Request) {
  const { id: categoryID, error: idError } = extractIdFromUrl(request.url);
  if (idError) return idError;

  try {
    await db.connect();
  } catch (error) {
    console.error('[API Error] DB connection failed:', error);
    return safeError('Error de conexion a la base de datos', 500);
  }

  const { data: body, error: parseError } = await parseBody(request);
  if (parseError) return parseError;

  try {
    await GameRepository.updateGameConfig(categoryID as string, body!);
    return NextResponse.json(
      {
        msg: `El category id ${categoryID} has been updated`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API Error] PATCH /api/game/[categoryId]:', error);
    return safeError('Error al actualizar la configuracion del juego', 500);
  }
}

export async function GET(request: Request) {
  const { id: categoryID, error: idError } = extractIdFromUrl(request.url);
  if (idError) return idError;

  try {
    await db.connect();
  } catch (error) {
    console.error('[API Error] DB connection failed:', error);
    return safeError('Error de conexion a la base de datos', 500);
  }

  try {
    const specificCategory = await GameRepository.specificGameConfig(
      categoryID as string
    );
    return NextResponse.json(specificCategory, { status: 200 });
  } catch (error) {
    console.error('[API Error] GET /api/game/[categoryId]:', error);
    return safeError('Error al obtener la configuracion del juego', 500);
  }
}
