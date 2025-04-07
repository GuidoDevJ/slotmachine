// models/User.ts

import mongoose, { Document, Schema } from 'mongoose';
import { StatusUser } from '../interfaces';

export interface IUser extends Document {
  email: string;
  password: string;
  status: 'active' | 'inactive';
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  status: {
    type: String,
    required: [true, 'El estado es obligatorio'],
    enum: StatusUser,
    default: 'inactive',
  },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
