// app/api/products/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
  ];
  return NextResponse.json(data);
}
