import { mongoose } from 'mongoose';
import { COLLECTION_CARTS, COLLECTION_PRODUCTS } from '../../../clases/constant.js';

const cartCollection = COLLECTION_CARTS;

const cartSchema = new mongoose.Schema({ 
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: COLLECTION_PRODUCTS
        },
        quantity: {
          required: true,
          type: Number
        }
      }
    ],
    default: []
  }
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
