import { IProducts } from '@/app/api/models/Products';
import instance from '../axios';

export interface Category {
  _id: string;
  name: string;
  imageURL: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await instance.get('api/categories', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imd1aWRvZ2F1bmE5QGdtYWlsLmNvbSIsImV4cCI6MTcyNzIyMDk2NX0.c944lTrsfqc53XtL559sLm1ObFOPJSHBPX5LTey4u4Q`,
      },
    });
    // Verifica si la respuesta es válida (status code en el rango 2xx)
    if (res.status < 200 || res.status >= 300) {
      throw new Error(
        'Error al obtener las categorías, código de estado: ' + res.status
      );
    }

    const categories: Category[] = res.data; // No necesitas hacer res.data() en axios, solo res.data
    console.log(categories);
    return categories;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    return [];
  }
};
export const getProductsCategories = async (
  categoryId: string
): Promise<any[]> => {
  try {
    const res = await instance.get(`api/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imd1aWRvZ2F1bmE5QGdtYWlsLmNvbSIsImV4cCI6MTcyODEzMTY1M30.4XCEK0feX_1HqozcCBHO8EKsX3znNdT04qBTYxgb2pU`,
      },
    });
    // Verifica si la respuesta es válida (status code en el rango 2xx)
    if (res.status < 200 || res.status >= 300) {
      throw new Error(
        'Error al obtener las categorías, código de estado: ' + res.status
      );
    }

    const categories: IProducts[] = res.data; // No necesitas hacer res.data() en axios, solo res.data
    return categories;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    return [];
  }
};

export const deleteProduct = async (productId: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await instance.delete(`/api/products/${productId}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      'Error al eliminar el producto',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Error al eliminar el producto'
    );
  }
};
