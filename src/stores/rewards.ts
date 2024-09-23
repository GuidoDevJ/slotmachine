import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  reward: string;
  setReward: (reward: string) => void;
  reset: () => void;
}

// Crear la tienda persistente
const useReward = create<UserState>()(
  persist(
    (set) => ({
      reward: '',
      setReward: (reward: string) => {
        set({ reward });
        // Guardar en localStorage con persistencia automática
        localStorage.setItem('reward', reward);
      },
      reset: () => {
        set({ reward: '' });
        localStorage.removeItem('reward');
      },
    }),
    {
      name: 'user-state', // Nombre del almacenamiento
      storage: createJSONStorage(() => localStorage), // Usar localStorage
    }
  )
);

export { useReward };
