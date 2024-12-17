import db from '@/app/api/lib/db';
import GameRepository from '@/app/api/repositories/gameRepositories';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await db.connect();
  let body = await request.json();
  // Convertir los IDs a ObjectId
  const transformedCategories = body.categoriesSelected.map(
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
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}

export async function GET(request: Request) {
  await db.connect();

  try {
    const lastSetting = await GameRepository.getLastGameConfig();
    console.log(lastSetting);
    return NextResponse.json(lastSetting, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
