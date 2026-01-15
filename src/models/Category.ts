import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: 'expense' | 'income' | 'transfer';
  color?: string;
}

const CategorySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['expense', 'income', 'transfer'], required: true },
  color: { type: String },
});

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
