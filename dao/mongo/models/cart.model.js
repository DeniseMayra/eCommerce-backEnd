import { mongoose } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({ 
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
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

// cartSchema.pre(['findById'], function(next){ //not work
//   this.populate('products.product');
//   next();
// });

export const cartModel = mongoose.model(cartCollection, cartSchema);
