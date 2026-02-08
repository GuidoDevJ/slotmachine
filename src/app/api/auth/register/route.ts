import db from '@/app/api/lib/db';
import UserRepository from '@/app/api/repositories/userRepositories';
import { parseBody, safeError } from '@/app/api/utils/apiHelpers';
import { createSecretKey } from 'crypto';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { sendEmail } from '../../utils/sendEmail';

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    await db.connect();

    const { data: body, error: parseError } = await parseBody(request);
    if (parseError) return parseError;

    const { email, password } = body;

    if (!email || !password) {
      return safeError('Email y contraseña son requeridos', 400);
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return safeError('Formato de datos invalido', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return safeError('Formato de email invalido', 400);
    }

    if (password.length < 6) {
      return safeError('La contraseña debe tener al menos 6 caracteres', 400);
    }

    const existing_user = await UserRepository.findUserByEmail(email);
    if (existing_user) {
      return safeError('Usuario ya registrado', 400);
    }

    const new_user = await UserRepository.createUser(email, password);

    if (!SECRET_KEY) {
      console.error('JWT_SECRET no esta configurado');
      return safeError('Error de configuracion del servidor', 500);
    }

    const secretKey = createSecretKey(Buffer.from(SECRET_KEY, 'utf-8'));

    const token = await new SignJWT({ email: new_user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secretKey);

    const verificationLink = `${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/verify?token=${token}`;

    try {
      await sendEmail({
        to: new_user.email,
        subject: 'Bienvenido a la aplicacion de juegos',
        html: `<p>Hola ${new_user.email}, necesita confirmar su usuario con el siguiente enlace:</p><a href="${verificationLink}">Aceptar</a>`,
      });
    } catch (emailError) {
      console.error('[API] Error enviando email de verificacion:', emailError);
    }

    return NextResponse.json({
      message: 'Usuario registrado con exito',
      userId: new_user._id,
    });
  } catch (error) {
    console.error('[API] POST /api/auth/register:', error);
    return safeError('Error interno del servidor', 500);
  }
}
