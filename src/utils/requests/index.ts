import instance from '../axios';

export interface Category {
  id: string;
  name: string;
  imageURL: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await instance.get('api/categories', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imd1aWRvZ2F1bmE5QGdtYWlsLmNvbSIsImV4cCI6MTcyNzAyMTkwM30.KpLxZooL3NRy-VEMDdmQ376aDaCuk0wwQ6HmyIFUD9Y`,
      },
    });
    console.log(res);
    // Verifica si la respuesta es válida (status code en el rango 2xx)
    if (res.status < 200 || res.status >= 300) {
      throw new Error(
        'Error al obtener las categorías, código de estado: ' + res.status
      );
    }

    const categories: Category[] = res.data; // No necesitas hacer res.data() en axios, solo res.data
    return categories;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    return [];
  }
};
