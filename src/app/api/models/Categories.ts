import mongoose, { Document, Schema } from 'mongoose';

// Modelo Category
export interface ICategory extends Document {
  name: string;
  imageURL: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
});

const Category =
  mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
