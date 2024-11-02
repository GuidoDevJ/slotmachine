import GameRepository from '@/app/api/repositories/gameRepositories';
import { NextResponse } from 'next/server';

import db from '../../lib/db';

export async function DELETE(request: Request) {
  await db.connect();
  // Obtener la URL completa
  const url = request.url || '';

  // Extraer el ID de la URL
  const segments = url.split('/'); // Dividir la URL por '/'
  const categoryID = segments.pop() as string; // Tomar el último segmento como ID

  try {
    await GameRepository.deleteGameConfig(categoryID);
    return NextResponse.json(
      {
        msg: `El category id ${categoryID} has been deleted`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
export async function PATCH(request: Request) {
  await db.connect();
  // Obtener la URL completa
  const url = request.url || '';
  const body = await request.json();
  // Extraer el ID de la URL
  const segments = url.split('/'); // Dividir la URL por '/'
  const categoryID = segments.pop() as string; // Tomar el último segmento como ID
  try {
    await GameRepository.updateGameConfig(categoryID, body);
    return NextResponse.json(
      {
        msg: `El category id ${categoryID} has been updated`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
export async function GET(request: Request) {
  await db.connect();
  // Obtener la URL completa
  const url = request.url || '';
  // Extraer el ID de la URL
  const segments = url.split('/'); // Dividir la URL por '/'
  const categoryID = segments.pop() as string; // Tomar el último segmento como ID
  try {
    const specificCategory = await GameRepository.specificGameConfig(
      categoryID
    );
    return NextResponse.json(specificCategory, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
