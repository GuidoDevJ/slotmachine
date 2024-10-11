import Products, { IProducts } from '@/app/api/models/Products';
import mongoose from 'mongoose';

class ProductsRepository {
  // Crear una nueva categoría
  async createProduct(
    name: string,
    description: string,
    imageURL: string,
    probability: number,
    Id: string
  ): Promise<IProducts> {
    const categoryId = new mongoose.Types.ObjectId(Id);
    const product = new Products({
      name,
      description,
      imageURL,
      probability,
      categoryId,
    });

    try {
      return await product.save(); // Guardar la categoría en la base de datos
    } catch (error) {
      throw new Error(`Error al crear el producto: ${error}`);
    }
  }

  async updateOne(
    id: string,
    category: Partial<IProducts>
  ): Promise<IProducts | null> {
    console.log(category);
    try {
      const updatedCategory = await Products.findByIdAndUpdate(
        id,
        { ...category },
        { new: true } // Devuelve el documento actualizado
      );
      console.log(updatedCategory);
      if (!updatedCategory) {
        throw new Error('Categoría no encontrada');
      }

      return updatedCategory;
    } catch (error) {
      throw new Error(`Error al actualizar la categoría: ${error}`);
    }
  }
  async deleteOne(id: string): Promise<void> {
    try {
      await Products.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al actualizar la categoría: ${error}`);
    }
  }
  async getAllByCategoryId(categoryId: string): Promise<IProducts[]> {
    try {
      const categories = await Products.find({
        categoryId: categoryId,
      });
      return categories;
    } catch (error) {
      throw new Error(`Error al obtener las categorías: ${error}`);
    }
  }
}

export default new ProductsRepository();
