import { Schema } from 'mongoose';
import Games, { ICategoriesSelected, IGame } from '../models/Game';

class GameRepository {
  // Crear o actualizar las configuraciones de un juego
  async createGameSettings(gameSettings: IGame): Promise<IGame> {
    // Buscar el último ajuste guardado
    const lastGameSetting = await Games.findOne()
      .sort({ lastUpdated: -1 })
      .exec();

    if (!lastGameSetting) {
      // Si no existe un ajuste anterior, simplemente creamos uno nuevo
      return await Games.create(gameSettings);
    }

    // Si ya existe un ajuste, debemos comparar y actualizarlo
    const updatedCategoriesSelected = this.updateCategoriesSelected(
      lastGameSetting.categoriesSelected,
      gameSettings.categoriesSelected
    );

    // Actualizamos las configuraciones del juego con las nuevas categorías y productos
    lastGameSetting.categoriesSelected = updatedCategoriesSelected;
    lastGameSetting.lastUpdated = new Date(); // Actualizamos la fecha de la última actualización

    const toObject = lastGameSetting.toObject();
    delete toObject._id;
    // Guardar los cambios
    return await Games.create(toObject);
  }

  // Función que compara las categorías seleccionadas y las actualiza
  private updateCategoriesSelected(
    oldCategories: ICategoriesSelected[],
    newCategories: ICategoriesSelected[]
  ): ICategoriesSelected[] {
    // Convertir las nuevas categorías seleccionadas en un mapa para fácil acceso
    const newCategoriesMap = new Map(
      newCategories.map((cat) => [cat.categoryId.toString(), cat])
    );

    // Filtrar las categorías existentes que siguen estando presentes en los nuevos datos
    const updatedCategories = oldCategories
      .filter((oldCategory) =>
        newCategoriesMap.has(oldCategory.categoryId.toString())
      )
      .map((oldCategory) => {
        const newCategory = newCategoriesMap.get(
          oldCategory.categoryId.toString()
        );

        if (newCategory) {
          // Actualizar productos solo si la categoría existe en los nuevos datos
          oldCategory.products = this.updateProducts(
            oldCategory.products,
            newCategory.products
          );
          // Eliminar la categoría del mapa para evitar duplicados
          newCategoriesMap.delete(oldCategory.categoryId.toString());
        }
        return oldCategory;
      });

    // Las categorías que están en los nuevos datos pero no en las antiguas se deben agregar
    const newCategoriesToAdd = Array.from(newCategoriesMap.values());

    // Retornar las categorías actualizadas junto con las nuevas
    return [...updatedCategories, ...newCategoriesToAdd];
  }

  // Función que actualiza los productos de una categoría
  private updateProducts(
    oldProducts: Schema.Types.ObjectId[],
    newProducts: Schema.Types.ObjectId[]
  ): Schema.Types.ObjectId[] {
    // Crear un Set con los productos nuevos para fácil comparación
    const newProductsSet = new Set(newProducts.map((p) => p.toString()));

    // Filtrar los productos que siguen estando presentes
    const updatedProducts = oldProducts.filter((oldProduct) =>
      newProductsSet.has(oldProduct.toString())
    );

    // Añadir los nuevos productos que no existían previamente
    const newProductsToAdd = newProducts.filter(
      (newProduct) =>
        !oldProducts.some(
          (oldProduct) => oldProduct.toString() === newProduct.toString()
        )
    );

    return [...updatedProducts, ...newProductsToAdd];
  }

  async getLastGameConfig(): Promise<IGame> {
    return await Games.findOne()
      .sort({ lastUpdated: -1 }) // Ordenar por la última actualización
      .populate({
        path: 'categoriesSelected.categoryId', // Hacer populate del campo categoryId
        select: 'name', // Solo selecciona el campo "name" de la categoría
      })
      .populate({
        path: 'categoriesSelected.products', // Hacer populate del campo products
      })
      .exec();
  }
}

export default new GameRepository();
