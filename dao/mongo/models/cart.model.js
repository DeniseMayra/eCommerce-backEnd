import { mongoose } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({ 
  products: {
    type: [
      {
        product: {
          required: true,
          type: String
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
