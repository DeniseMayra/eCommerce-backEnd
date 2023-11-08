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

      return {error: false, cart};
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
        return {error: false, cart: cartById};
      } else {
        return {error: true, message:`Id no encontrado`};
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
          return {error: false, cart };

        } else {
          return {error: true, message:'Id no encontrado'};
        }

      } else {
        return {error: true, message:'Faltan datos del producto id o cantidad'};
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

  