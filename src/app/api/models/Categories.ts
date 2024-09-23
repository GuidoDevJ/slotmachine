import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  imageURL: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
});

// Evita sobrescribir el modelo si ya existe
const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
