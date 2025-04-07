// app/api/register/route.ts

import db from '@/app/api/lib/db';
import UserRepository from '@/app/api/repositories/userRepositories';
import { createSecretKey } from 'crypto';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { sendEmail } from '../../utils/sendEmail';
const SECRET_KEY = process.env.JWT_SECRET;

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
  // Convertir la clave secreta a un formato que jose entienda
  const secretKey = createSecretKey(Buffer.from(SECRET_KEY as string, 'utf-8'));

  // Generar el token JWT usando jose
  const token = await new SignJWT({ email: new_user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secretKey);
  const verificationLink = `${process.env.BASE_URL}/api/auth/verify?token=${token}`;
  await sendEmail({
    to: new_user.email,
    subject: 'Bienvenido a la aplicacion de juegos',
    html: `<p>Hola ${new_user.email}, necesita confirmar su usuario con el siguiente enlace:</p><a href="${verificationLink}">Aceptar</a>`,
  });
  return NextResponse.json({
    message: 'Usuario registrado con éxito',
    userId: new_user._id,
  });
}
