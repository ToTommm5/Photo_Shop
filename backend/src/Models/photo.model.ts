import { Schema, model } from "mongoose";

export interface Photo {
  id: string;
  name: string;
  price: number;
  size: string;
  favorite: boolean;
  imgUrl: string;
  epreuveid: number;
}

export const PhotoSchema = new Schema<Photo>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    favorite: { type: Boolean, default: false },
    imgUrl: { type: String, required: true },
    epreuveid: { type: Number, required: true },
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

export const PhotoModel = model<Photo>("photo", PhotoSchema);
