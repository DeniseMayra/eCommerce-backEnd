import { CustomErrorService } from '../../../services/customError.service.js';
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
      CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});

    }
  }

  getAllCarts = async() => {
    try{
      const result = await this.model.find();
      return result;

    } catch (error) {
      CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});

    }
  }

  getProductByCartId = async(id) => {
    try{
      const result = await this.model.findById(id).populate('products.product').lean();
      return result;

    } catch (error) {
      if (error.kind === 'ObjectId') {
        CustomErrorService.createIdNotFoundError(error.value);
      } else {
        CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});

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
        CustomErrorService.createIdNotFoundError(error.value);
      } else {
        CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});

      }
    }
  }

  deleteProductFromCart = async (cid, pid) => {
    try {
      const cart = await this.getProductByCartId(cid);
      const newProductList = cart.products.filter(prod => prod.product._id != pid);
      cart.products = newProductList;
      const result = await this.model.findByIdAndUpdate( cid, cart, {new:true});
      return result;
      
    } catch (error) {
      if (error.kind === 'ObjectId') {
        CustomErrorService.createIdNotFoundError(error.value);
      } else {
        CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});
      }
    }
  }

  deleteCart = async(id) => {
    try{
      const result = await this.model.findByIdAndUpdate( id, {_id: id, products: []}, {new:true});
      return result;

    } catch (error){
      if (error.kind === 'ObjectId') {
        CustomErrorService.createIdNotFoundError(error.value);
      } else {
        CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});
      }
    }
  }
}

  