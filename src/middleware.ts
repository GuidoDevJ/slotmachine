import { JWTPayload, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

interface Req extends Request {
  user: JWTPayload;
}

export async function middleware(request: Req) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const excludeOrigins = [
    '/api/auth/login',
    '/api/game',
    '/api/auth/verify',
    '/api/auth/register',
  ]; // Rutas a excluir

  // Definir las rutas que deben ser excluidas
  if (excludeOrigins.includes(pathname)) {
    return NextResponse.next();
  }

  // Permitir POST a /api/redemption sin auth (jugadores creando codigos al ganar)
  if (pathname === '/api/redemption' && request.method === 'POST') {
    return NextResponse.next();
  }

  if (!process.env.JWT_SECRET) {
    console.error('[Middleware Error] JWT_SECRET is not configured');
    return NextResponse.json(
      { error: 'Configuracion del servidor incompleta' },
      { status: 500 }
    );
  }

  const token = request.headers.get('Authorization')?.split(' ')[1]; // Obtener el token del encabezado Authorization
  if (!token) {
    return NextResponse.json(
      { error: 'Token no proporcionado' },
      { status: 401 }
    );
  }

  try {
    // Verificar el token utilizando `jose`
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: 'Token invalido o expirado' },
      { status: 401 }
    );
  }
}

// Definir las rutas en las que el middleware debe aplicarse
export const config = {
  matcher: ['/api/:path*'], // Aplica a todas las rutas que comienzan con /api/
};
