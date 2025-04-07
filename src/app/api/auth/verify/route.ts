import UserRepository from '@/app/api/repositories/userRepositories';

import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { StatusUser } from '../../interfaces';
import db from '../../lib/db';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!); // Asegúrate de tenerlo

export async function GET(req: NextRequest) {
  await db.connect();

  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return new NextResponse('Token inválido', { status: 400 });
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);
    const email = payload.email as string;

    if (!email) {
      return new NextResponse('Token inválido', { status: 400 });
    }

    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      return new NextResponse('Usuario no encontrado', { status: 404 });
    }

    user.status = StatusUser.ACTIVE;
    await user.save();

    return NextResponse.redirect(new URL('/config', req.url));
  } catch (error) {
    console.error('Token inválido o expirado:', error);
    return new NextResponse('Token inválido o expirado', { status: 401 });
  }
}
