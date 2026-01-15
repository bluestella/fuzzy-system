import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
