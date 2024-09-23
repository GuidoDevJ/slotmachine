import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';


export default function MyApp({ Component, pageProps }: AppProps) {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);
  return <Component {...pageProps} />
}