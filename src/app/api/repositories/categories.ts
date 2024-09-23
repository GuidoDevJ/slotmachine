import Category, { ICategory } from '@/app/api/models/Categories';

class CategoriesRepository {
  // Crear una nueva categoría
  async createCategory(name: string, imageURL: string): Promise<ICategory> {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      throw new Error('La categoría ya existe');
    }
    const category = new Category({
      name,
      imageURL,
    });

    try {
      return await category.save(); // Guardar la categoría en la base de datos
    } catch (error: any) {
      throw new Error(`Error al crear la categoría: ${error}`);
    }
  }

  // Actualizar una categoría existente
  async updateOne(
    id: string,
    category: Partial<ICategory>
  ): Promise<ICategory | null> {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { ...category },
        { new: true } // Devuelve el documento actualizado
      );

      if (!updatedCategory) {
        throw new Error('Categoría no encontrada');
      }

      return updatedCategory;
    } catch (error) {
      throw new Error(`Error al actualizar la categoría: ${error}`);
    }
  }

  async getAllCategories(): Promise<ICategory[]> {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      throw new Error(`Error al obtener las categorías: ${error}`);
    }
  }
}

export default new CategoriesRepository();
