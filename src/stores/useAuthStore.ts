// stores/useAuthStore.ts
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Interfaces
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface TokenPayload {
  exp: number;
  // Otros campos según tu JWT
}

// Crear la tienda de Zustand con persistencia
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,

      login: (token: string) => {
        try {
          const decoded: TokenPayload = jwtDecode(token);
          const expirationTime = decoded.exp * 1000;
          const now = Date.now();

          if (now < expirationTime) {
            set({
              token,
              isAuthenticated: true,
            });

            // Configurar un timeout para cerrar sesión automáticamente
            setTimeout(() => {
              get().logout();
            }, expirationTime - now);
          } else {
            // Token ya expirado
            get().logout();
          }
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          get().logout();
        }
      },
      logout: () => {
        console.log('Holaa');
        set({
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'auth-storage', // Nombre de la clave en localStorage
      storage: createJSONStorage(() => localStorage), // Usar 'localStorage'
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
