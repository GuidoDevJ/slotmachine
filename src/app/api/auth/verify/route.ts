import UserRepository from '@/app/api/repositories/userRepositories';
import { safeError } from '@/app/api/utils/apiHelpers';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { StatusUser } from '../../interfaces';
import db from '../../lib/db';

export async function GET(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      return safeError('Configuracion del servidor incompleta', 500);
    }

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

    await db.connect();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return new NextResponse('Token invalido', { status: 400 });
    }

    try {
      const { payload } = await jwtVerify(token, secretKey);
      const email = payload.email as string;

      if (!email) {
        return new NextResponse('Token invalido', { status: 400 });
      }

      const user = await UserRepository.findUserByEmail(email);
      if (!user) {
        return new NextResponse('Usuario no encontrado', { status: 404 });
      }

      user.status = StatusUser.ACTIVE;
      await user.save();

      return NextResponse.redirect(new URL('/config', req.url));
    } catch (error) {
      console.error('Token invalido o expirado:', error);
      return new NextResponse('Token invalido o expirado', { status: 401 });
    }
  } catch (error) {
    console.error('[API Error] GET /api/auth/verify:', error);
    return safeError('Error interno del servidor', 500);
  }
}
