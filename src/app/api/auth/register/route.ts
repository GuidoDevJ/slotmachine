// app/api/register/route.ts

import db from '@/app/api/lib/db';
import UserRepository from '@/app/api/repositories/userRepositories';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await db.connect(); // Singleton connection

  const { email, password } = await request.json();

  // Verificar si el usuario ya existe
  const existing_user = await UserRepository.findUserByEmail(email);
  if (existing_user) {
    return NextResponse.json(
      { error: 'Usuario ya registrado' },
      { status: 400 }
    );
  }

  // Crear el nuevo usuario
  const new_user = await UserRepository.createUser(email, password);
  return NextResponse.json({
    message: 'Usuario registrado con éxito',
    userId: new_user._id,
  });
}
