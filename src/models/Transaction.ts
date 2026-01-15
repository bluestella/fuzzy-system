import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  accountId: mongoose.Types.ObjectId;
  type: 'expense' | 'income' | 'transfer';
  amount: number;
  date: Date;
  description: string;
  merchant?: string;
  notes?: string;
  categoryId?: mongoose.Types.ObjectId;
  transfer?: {
    toAccountId?: mongoose.Types.ObjectId;
    transferGroupId?: string;
  };
  tags?: string[];
  paymentMethod?: string;
  receiptImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
  type: { type: String, enum: ['expense', 'income', 'transfer'], required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  merchant: String,
  notes: String,
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', index: true },
  transfer: {
    toAccountId: { type: Schema.Types.ObjectId, ref: 'Account' },
    transferGroupId: String
  },
  tags: [String],
  paymentMethod: String,
  receiptImageUrl: String
}, { timestamps: true });

TransactionSchema.index({ userId: 1, date: -1 });

const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default Transaction;
