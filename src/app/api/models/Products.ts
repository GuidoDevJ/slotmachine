import mongoose, { Document, Schema } from 'mongoose';

// Modelo Product
export interface IProducts extends Document {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  probability: number;
  categoryId: mongoose.Types.ObjectId;
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
    type: Schema.Types.ObjectId, // Cambiado aquí
    ref: 'Category',
    required: [true, 'El ID de la categoría es obligatorio'],
  },
});

const ProductModel =
  mongoose.models.Product ||
  mongoose.model<IProducts>('Product', productSchema);
export default ProductModel;
