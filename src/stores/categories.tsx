import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Category {
  id: string;
  name: string;
  imageUrl: string;
} 

interface CategorySelected extends Category {
    setSelectedCategory: (category: Category) => void;
  reset: () => void;
}


const initialCategorySelectedState:CategorySelected = {
  id:"",
  imageUrl:"",
  name:"",
  setSelectedCategory: () => { },
  reset: () => { }
};

// Crear la tienda persistente
const useSelectedCategory = create<CategorySelected>()(
  persist(
    (set) => ({
      ...initialCategorySelectedState,
      setSelectedCategory: (category: Category) => {
        set( category );
        // Guardar en localStorage con persistencia automática
        localStorage.setItem('SelectedCategory', JSON.stringify(category));
      },
      getSelectedCategory: () => { 
        const storedCategory = localStorage.getItem('SelectedCategory');
        return storedCategory ? JSON.parse(storedCategory) : null;
      },
      reset: () => {
        set(initialCategorySelectedState);
        localStorage.removeItem('SelectedCategory');
      },
    }),
    {
      name: 'SelectedCategory', // Nombre del almacenamiento
      storage: createJSONStorage(() => localStorage), // Usar localStorage
    }
  )
);

export { useSelectedCategory };
