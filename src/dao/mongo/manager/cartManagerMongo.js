import { cartModel } from '../models/cart.model.js';

export class CartManagerMongo {
  constructor() {
    this.model = cartModel;
  }

  createCart = async() => { 
    try{
      const cart = {products: []};
      const result = await this.model.create(cart); 
      return result;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  getAllCarts = async() => {
    try{
      const result = await this.model.find();
      return result;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  getProductByCartId = async(id) => {
    try{
      const result = await this.model.findById(id).populate('products.product').lean();
      return result;

    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new Error('Id no encontrado');
      } else {
        throw new Error(error.message);
      }
    }
  }
  
  addProductInCart = async (cid, newProd) => {
    try{
      const cart = await this.getProductByCartId(cid);
      let productExist = false;

      cart.products.forEach(element => {
        if (element.product._id == newProd.product){
          element.quantity = newProd.quantity;
          productExist = true;
        }
      });

      if (!productExist){
        cart.products.push(newProd);
      }

      const result = await this.model.findByIdAndUpdate( cid, cart, {new:true});
      return result;

    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new Error('Id no encontrado');
      } else {
        throw new Error(error.message);
      }
    }
  }

  // missing in file system manager
  deleteProductFromCart = async (cid, pid) => {
    try {
      const cart = await this.getProductByCartId(cid);
      const newProductList = cart.products.filter(prod => prod.product._id != pid);
      cart.products = newProductList;
      const result = await this.model.findByIdAndUpdate( cid, cart, {new:true});
      return result;
      
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new Error('Id no encontrado');
      } else {
        throw new Error(error.message);
      }
    }
  }

  // new method only here
  deleteCart = async(id) => {
    try{
      // const result = await this.model.findByIdAndDelete(id);
      const result = await this.model.findByIdAndUpdate( id, {_id: id, products: []}, {new:true});
      
      return result;

    } catch (error){
      if (error.kind === 'ObjectId') {
        throw new Error('Id no encontrado');
      } else {
        throw new Error(error.message);
      }
    }
  }
}

  