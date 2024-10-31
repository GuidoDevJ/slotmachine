import mongoose, { Document, Schema } from 'mongoose';

export interface ICategoriesSelected {
  categoryId: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
}

export interface IGame extends Document {
  categoryId: Schema.Types.ObjectId;
  lastUpdated: Date;
  categoriesSelected: ICategoriesSelected[];
}

const categoriesSelectedSchema = new Schema<ICategoriesSelected>({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // Asumiendo que tienes un modelo de categorías
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Products', // Asumiendo que tienes un modelo de productos
      required: true,
    },
  ],
});

const gameSchema = new Schema<IGame>({
  categoryId: Schema.Types.ObjectId,
  lastUpdated: {
    type: Date,
    default: Date.now, // Asigna la fecha actual automáticamente
  },
  categoriesSelected: {
    type: [categoriesSelectedSchema], // Especifica que es un array de objetos
    required: [true, 'Las categorías seleccionadas son requeridas'],
  },
});

// Registrar el modelo con el nombre correcto 'Games'
const Games =
  mongoose.models.Games || mongoose.model<IGame>('Games', gameSchema);

export default Games;
