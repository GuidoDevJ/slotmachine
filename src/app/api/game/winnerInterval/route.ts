import GameRepository from '@/app/api/repositories/gameRepositories';
import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function POST(request: Request) {
  await db.connect();
  let body = await request.json();
  let { interval } = body;
  console.log(interval);
  // Obtener la fecha actual de Argentina (UTC-3)
  const argentinaTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Argentina/Buenos_Aires',
  });
  try {
    const newSetting = await GameRepository.setWinnetInterval(
      interval,
      new Date(argentinaTime)
    );
    return NextResponse.json(newSetting, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
