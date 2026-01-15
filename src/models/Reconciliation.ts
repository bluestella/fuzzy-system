import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReconciliation extends Document {
  userId: mongoose.Types.ObjectId;
  accountId: mongoose.Types.ObjectId;
  statementBalance: number;
  statementDate: Date;
  note?: string;
  createdAt: Date;
}

const ReconciliationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
  statementBalance: { type: Number, required: true },
  statementDate: { type: Date, required: true },
  note: String,
}, { timestamps: { createdAt: true, updatedAt: false } });

ReconciliationSchema.index({ userId: 1, accountId: 1, statementDate: -1 });

const Reconciliation: Model<IReconciliation> = mongoose.models.Reconciliation || mongoose.model<IReconciliation>('Reconciliation', ReconciliationSchema);
export default Reconciliation;
