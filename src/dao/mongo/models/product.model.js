import { mongoose } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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
    enums: ['mtc', 'acc'],
    index: true
  },
  code: {
    required: true,
    type: String,
    unique: true
  }
});
prodSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(prodCollection, prodSchema);
