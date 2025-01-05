"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/game'); // Reemplaza la ruta actual por la nueva
  }, [router]);

  return null; // No es necesario renderizar nada
}
