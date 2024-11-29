'use client';
import LoginForm from '@/components/Form';
import { MainSpinner } from '@/ui/Loaders';
import { Logo } from '@/ui/Logo';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BackOffice = () => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const nameOfCasino = "Casinos del Mocona";

  useEffect(() => {
    const storedData = localStorage.getItem('auth-storage');
    let token = null;

    if (storedData) {
      try {
        token = JSON.parse(storedData); // Intentar parsear solo si existe.
      } catch (error) {
        console.error("Error parsing auth-storage from localStorage:", error);
      }
    }

    if (!token || !token.token) {
      router.push('/login'); // Redirigir al login si no está autenticado
    }
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h-auto flex flex-col items-center justify-center">
        <Logo />
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">{nameOfCasino}</h1>
        <h3 className="mt-10 mb-10 text-1xl md:text-2xl lg:text-3xl">Ingresa tus datos</h3>
      </div>
      <LoginForm setIsloading={setIsloading} />
      {isLoading ? (
        <div className="absolute w-full h-full bg-white flex justify-center items-center">
          <MainSpinner />
        </div>
      ) : null}
    </div>
  );
};

export default BackOffice;
