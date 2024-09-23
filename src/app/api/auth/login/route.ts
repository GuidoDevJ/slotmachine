// app/api/login/route.ts

import db from '@/app/api/lib/db';
import UserRepository from '@/app/api/repositories/userRepositories';
import { createSecretKey } from 'crypto';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(request: Request) {
  await db.connect(); // Singleton connection

  const { email, password } = await request.json();

  // Buscar al usuario en la base de datos
  const user = await UserRepository.findUserByEmail(email);
  if (!user) {
    return NextResponse.json(
      { error: 'Usuario no encontrado' },
      { status: 404 }
    );
  }

  // Verificar la contraseña
  const is_password_correct = await UserRepository.comparePassword(
    password,
    user.password
  );
  if (!is_password_correct) {
    return NextResponse.json(
      { error: 'Contraseña incorrecta' },
      { status: 400 }
    );
  }

  // Convertir la clave secreta a un formato que jose entienda
  const secretKey = createSecretKey(Buffer.from(SECRET_KEY as string, 'utf-8'));

  // Generar el token JWT usando jose
  const token = await new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secretKey);

  return NextResponse.json({ message: 'Inicio de sesión exitoso', token });
}
