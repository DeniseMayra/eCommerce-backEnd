import { mongoose } from 'mongoose';

const prodCollection = 'products';

const prodSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: String,
  price: {
    required: true,
    type: Number
  },
  status: Boolean,
  thumbnails: [
    {type: String}
  ],
  stock: {
    required: true,
    type: Number
  },
  category: {
    required: true,
    type: String,
    enums: ['mtc', 'acc']
  },
  code: {
    required: true,
    type: String,
    unique: true
  }
});

export const productModel = mongoose.model(prodCollection, prodSchema);
