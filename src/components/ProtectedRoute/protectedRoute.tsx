// components/ProtectedRoute.tsx
import { useAuthStore } from '@/stores/useAuthStore';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirigir al login si no está autenticado
    } else {
      const decoded = jwtDecode(token as string) as any;
      const expirationTime = decoded.exp * 1000;
      const now = Date.now();
      if (now > expirationTime) {
        console.log('No está autenticado');
        router.push('/login'); // Redirigir al login si no está autenticado
      }
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default ProtectedRoute;
