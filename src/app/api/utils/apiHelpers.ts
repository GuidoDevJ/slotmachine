import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import db from '@/app/api/lib/db';

/**
 * Wraps an API handler with try-catch, db connection, and safe error responses.
 */
export function withErrorHandler(
  handler: (req: Request) => Promise<NextResponse>
) {
  return async (req: Request): Promise<NextResponse> => {
    try {
      await db.connect();
      return await handler(req);
    } catch (error) {
      console.error(`[API Error] ${req.method} ${req.url}:`, error);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  };
}

/**
 * Safely parse JSON body. Returns null and error response if invalid.
 */
export async function parseBody<T = any>(
  req: Request
): Promise<{ data: T | null; error: NextResponse | null }> {
  try {
    const data = await req.json();
    return { data, error: null };
  } catch {
    return {
      data: null,
      error: NextResponse.json(
        { error: 'Cuerpo de la solicitud invalido (JSON malformado)' },
        { status: 400 }
      ),
    };
  }
}

/**
 * Extract route parameter from URL (last segment).
 * Validates it's a valid MongoDB ObjectId.
 */
export function extractIdFromUrl(
  url: string
): { id: string | null; error: NextResponse | null } {
  const segments = url.split('/').filter(Boolean);
  const id = segments.pop() || '';

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return {
      id: null,
      error: NextResponse.json(
        { error: 'ID invalido' },
        { status: 400 }
      ),
    };
  }

  return { id, error: null };
}

/**
 * Validate required fields in a body object.
 * Returns error response if any field is missing.
 */
export function validateRequired(
  body: Record<string, any>,
  fields: string[]
): NextResponse | null {
  const missing = fields.filter(
    (f) => body[f] === undefined || body[f] === null || body[f] === ''
  );
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Campos requeridos faltantes: ${missing.join(', ')}` },
      { status: 400 }
    );
  }
  return null;
}

/**
 * Safe error response that never leaks internal details.
 */
export function safeError(
  message: string,
  status: number = 500
): NextResponse {
  return NextResponse.json({ error: message }, { status });
}
