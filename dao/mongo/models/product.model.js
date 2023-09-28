import { mongoose } from 'mongoose';

const prodCollection = 'products';

const prodSchema = new mongoose.Schema({
  title: {
    required: true,
    type: string
  },
  description: string,
  price: {
    required: true,
    type: number
  },
  status: boolean,
  thumbnails: [
    {type: string}
  ],
  stock: {
    required: true,
    type: number
  },
  category: {
    required: true,
    type: string,
    enums: ['mtc', 'acc']
  },
  code: {
    required: true,
    type: string,
    unique: true
  }
});

export const productModel = mongoose.model(prodCollection, prodSchema);
