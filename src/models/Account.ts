import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAccount extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  institution: string;
  currency: string;
  openingBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  institution: { type: String, required: true },
  currency: { type: String, default: 'PHP' },
  openingBalance: { type: Number, default: 0 },
}, { timestamps: true });

AccountSchema.index({ userId: 1, name: 1 });

const Account: Model<IAccount> = mongoose.models.Account || mongoose.model<IAccount>('Account', AccountSchema);
export default Account;
