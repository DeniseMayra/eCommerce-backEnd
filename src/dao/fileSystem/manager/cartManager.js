import fs from 'fs';
import { randomUUID } from 'crypto';

export class CartManager {
  constructor(path) {
    this.path = path;
  }

  createCart = async() => { 
    try{
      const allCarts = await this.getAllCarts();
      let cart = null;
      do {
        cart = {id: randomUUID(), products: []};
      } while (!this.isValidId(cart.id, allCarts));

      allCarts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, '\t'));

      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  isValidId = (id, allCarts) => {
    const cart = allCarts.find(ele => ele.id === id);
    if (cart) {
      return false;
    } else {
      return true;
    }
  }

  getAllCarts = async() => {
    try{
      const allCarts = await fs.promises.readFile(this.path, 'utf-8');
      if (!allCarts) {
        return [];
      } else {
        return JSON.parse(allCarts);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getProductByCartId = async(id) => {
    try{
      const allCarts = await this.getAllCarts();
      const cartById = allCarts.find(cart => cart.id === id);
  
      if (cartById){
        return cartById;
      } else {
        throw new Error('Id no encontrado');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  addProductInCart = async (cid, newProd) => {
    try{
      if (newProd.product && newProd.quantity){

        const allCarts = await this.getAllCarts();
        const cart = allCarts.find(c => c.id === cid);
        if (cart){
          allCarts.forEach(cart => {
            if (cart.id === cid){

              let productExist = false;
              cart.products.forEach(element => {

                if (element.product === newProd.product){
                  element.quantity = newProd.quantity;
                  productExist = true;
                }
              });

              if (!productExist){
                cart.products.push(newProd);
              }

            }  
          });

          await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, '\t'));
          return cart;

        } else {
          throw new Error('Id no encontrado');
        }

      } else {
        throw new Error('Faltan datos del producto id o cantidad');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  deleteProductFromCart = async(cid, pid) => {
    try {
      // To Do: delete functionality
      const result = await this.getProductByCartId(cid);
      return result;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  deleteCart = async (id) => {
    try {
      const allCarts = await this.getAllCarts();
      const carts = allCarts.find(cart => cart.id !== id);

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

  