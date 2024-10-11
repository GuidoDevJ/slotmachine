'use client';
import LoginForm from '@/components/Form';
import { MainSpinner } from '@/ui/Loaders';
import { Logo } from '@/ui/Logo';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BackOffice = () => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirigir al login si no está autenticado
    }
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h-80 flex flex-col items-center justify-center">
        <Logo />
        <h1 className="text-2xl md:text-4xl lg:text-5xl">Casino del Mocona</h1>
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
