import { mongoose } from 'mongoose';

const cartCollection = 'products';

const cartSchema = new mongoose.Schema({ 
  id: {
    required: true,
    type: string
  },
  products: [
    {
      product: {
        required: true,
        type: string
      },
      quantity: {
        required: true,
        type: number
      }
    }
  ]

});

export const productModel = mongoose.model(cartCollection, cartSchema);
