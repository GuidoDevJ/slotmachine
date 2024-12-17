import mongoose, { Document, Schema } from 'mongoose';

// Modelo Game
export interface ICategoriesSelected {
  categoryId: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
}

export interface IGame extends Document {
  lastUpdated: Date;
  categoriesSelected: ICategoriesSelected[];
}

const categoriesSelectedSchema = new Schema<ICategoriesSelected>({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
});

const gameSchema = new Schema<IGame>({
  lastUpdated: { type: Date, default: Date.now },
  categoriesSelected: {
    type: [categoriesSelectedSchema],
    required: [true, 'Las categorías seleccionadas son requeridas'],
  },
});

// Asegúrate de no redefinir el modelo
const GameModel =
  mongoose.models.Game || mongoose.model<IGame>('Game', gameSchema);
export default GameModel;
