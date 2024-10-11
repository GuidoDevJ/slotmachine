import mongoose, { Document, Schema } from 'mongoose';

export interface IProducts extends Document {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  probability: number;
  categoryId: Schema.Types.ObjectId;
}

const productSchema = new Schema<IProducts>({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
  },
  imageURL: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria'],
  },
  probability: {
    type: Number,
    required: [true, 'La probabilidad es obligatoria'],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // Cambié a 'Category' para que coincida con el modelo
    required: [true, 'El ID de la categoría es obligatorio'],
  },
});

const Products =
  mongoose.models.Products ||
  mongoose.model<IProducts>('Products', productSchema);

export default Products;
