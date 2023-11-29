import { mongoose } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { COLLECTION_PRODUCTS, PRODUCTS_CATEGORY_ACCESORIES, PRODUCTS_CATEGORY_MOTORCYCLE } from '../../../clases/constant.js';

const prodCollection = COLLECTION_PRODUCTS;

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
    enums: [PRODUCTS_CATEGORY_MOTORCYCLE, PRODUCTS_CATEGORY_ACCESORIES],
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
