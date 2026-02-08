import GameRepository from '@/app/api/repositories/gameRepositories';
import { parseBody, safeError } from '@/app/api/utils/apiHelpers';
import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function POST(request: Request) {
  try {
    try {
      await db.connect();
    } catch (error) {
      console.error('[API Error] DB connection failed:', error);
      return safeError('Error de conexion a la base de datos', 500);
    }

    const { data: body, error: parseError } = await parseBody(request);
    if (parseError) return parseError;

    const { interval } = body!;

    if (typeof interval !== 'number' || interval <= 0) {
      return safeError('El intervalo debe ser un numero positivo', 400);
    }

    // Obtener la fecha actual de Argentina (UTC-3)
    const argentinaTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Argentina/Buenos_Aires',
    });

    const newSetting = await GameRepository.setWinnetInterval(
      interval,
      new Date(argentinaTime)
    );
    return NextResponse.json(newSetting, { status: 201 });
  } catch (error) {
    console.error('[API Error] POST /api/game/winnerInterval:', error);
    return safeError('Error al configurar el intervalo de ganador', 500);
  }
}
