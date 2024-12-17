'use client';
import LoginForm from '@/components/Form';
import { MainSpinner } from '@/ui/Loaders';
import { Logo } from '@/ui/Logo';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BackOffice = () => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const nameOfCasino = 'Casinos del Mocona';

  useEffect(() => {
    const storedData = localStorage.getItem('auth-storage');
    let token = null;

    if (storedData) {
      try {
        token = JSON.parse(storedData); // Intentar parsear solo si existe.
      } catch (error) {
        console.error('Error parsing auth-storage from localStorage:', error);
      }
    }

    if (!token || !token.token) {
      router.push('/login'); // Redirigir al login si no está autenticado
    }
  }, [router]);

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <div className="h-auto flex flex-col items-center justify-start">
        <Logo />
        <h1 className="md:text-[36px] font-bold">
          {nameOfCasino}
        </h1>
        <h3 className="mt-2 mb-4 text-[12px] md:text-[20px] text-[#000000]">
          Ingresa tus datos
        </h3>
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
