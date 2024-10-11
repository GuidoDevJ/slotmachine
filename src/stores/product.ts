import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  probability: number;
}

interface ProductSelected extends Product {
  setProductCategory: (product: Product) => void;
  getProductCategory: () => ProductSelected;
  reset: () => void;
}

const initialProductSelectedState: ProductSelected = {
  _id: '',
  imageUrl: '',
  name: '',
  description: '',
  probability: 0,
  setProductCategory: () => {},
  getProductCategory: () => initialProductSelectedState,
  reset: () => {},
};

// Crear la tienda persistente
const useProductCategory = create<ProductSelected>()(
  persist(
    (set) => ({
      ...initialProductSelectedState,
      setProductCategory: (product: Product) => {
        set(product);
        // Guardar en localStorage con persistencia automática
        localStorage.setItem('SelectedProduct', JSON.stringify(product));
      },
      getProductCategory: () => {
        const storedCategory = localStorage.getItem('SelectedProduct');
        return storedCategory ? JSON.parse(storedCategory) : null;
      },
      reset: () => {
        set(initialProductSelectedState);
        localStorage.removeItem('SelectedProduct');
      },
    }),
    {
      name: 'SelectedProduct', // Nombre del almacenamiento
      storage: createJSONStorage(() => localStorage), // Usar localStorage
    }
  )
);

export { useProductCategory };
