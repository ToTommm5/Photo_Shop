import { Schema, model,models } from "mongoose";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  adress: string;
  isAdmin: boolean;
}

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adress: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const UserModel =  models.photo || model<User>('photo', UserSchema); 
