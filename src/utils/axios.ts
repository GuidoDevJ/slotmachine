// utils/axios.ts
import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http:localhost:3000', // Configura tu baseURL
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      // Asegura que estamos en el cliente
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta para manejar errores de autenticación
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Manejar token expirado o no válido
      useAuthStore.getState().logout();
      // Redirigir al login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
