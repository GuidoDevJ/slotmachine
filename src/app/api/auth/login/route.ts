import db from '@/app/api/lib/db';
import UserRepository from '@/app/api/repositories/userRepositories';
import { parseBody, safeError } from '@/app/api/utils/apiHelpers';
import { createSecretKey } from 'crypto';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { StatusUser } from '../../interfaces';

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

    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      return safeError('Credenciales invalidas', 401);
    }

    const is_password_correct = await UserRepository.comparePassword(
      password,
      user.password
    );
    if (!is_password_correct) {
      return safeError('Credenciales invalidas', 401);
    }

    const status = user.status as StatusUser;
    if (status === StatusUser.INACTIVE) {
      return safeError('Usuario inactivo. Verifica tu email para activar la cuenta', 403);
    }

    if (!SECRET_KEY) {
      console.error('JWT_SECRET no esta configurado');
      return safeError('Error de configuracion del servidor', 500);
    }

    const secretKey = createSecretKey(Buffer.from(SECRET_KEY, 'utf-8'));

    const token = await new SignJWT({ email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secretKey);

    return NextResponse.json({ message: 'Inicio de sesion exitoso', token });
  } catch (error) {
    console.error('[API] POST /api/auth/login:', error);
    return safeError('Error interno del servidor', 500);
  }
}
