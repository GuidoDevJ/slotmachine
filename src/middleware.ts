import { JWTPayload, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET as string;

interface Req extends Request {
  user: JWTPayload;
}

export async function middleware(request: Req) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const excludeOrigins = ['/api/auth/login', '/api/game'];

  // Definir las rutas que deben ser excluidas
  if (excludeOrigins.includes(pathname)) {
    return NextResponse.next();
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
      new TextEncoder().encode(SECRET_KEY)
    );

    // Almacenar los datos decodificados en la solicitud
    // request.user = payload as any;
    console.log(payload);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: 'Token inválido o expirado' },
      { status: 403 }
    );
  }
}

// Definir las rutas en las que el middleware debe aplicarse
export const config = {
  matcher: ['/api/:path*'], // Aplica a todas las rutas que comienzan con /api/
};
