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

      return {error: false, msg:`Carrito creado Correctamente con id: ${cart.id}`};
    } catch (error) {
      console.log('ERROR: ', error.message);
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
      console.log('ERROR: ', error.message);
    }
  }

  getProductByCartId = async(id) => {
    try{
      const allCarts = await this.getAllCarts();
      const cartById = allCarts.find(cart => cart.id === id);
  
      if (cartById){
        return {error: false, products: cartById.products};
      } else {
        return {error: true, products: null};
      }
    } catch (error) {
      console.log('ERROR: ', error.message);
    }
  }
  
  addProductInCart = async (cid, newProd) => {
    try{
      if (newProd.product && newProd.quantity){
  
        const allCarts = await this.getAllCarts();
        let cartExist = false;
  
        allCarts.forEach(cart => {
          if (cart.id === cid){
  
            let productExist = false;
            cart.products.forEach(element => {
  
              if (element.product === newProd.product){
                element.quantity = element.quantity + newProd.quantity;
                productExist = true;
              }
            });
  
            if (!productExist){
              cart.products.push(newProd);
            }
  
            cartExist = true;
          }  
        });
  
        if (cartExist){
          await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, '\t'));
          return {error: false, msg:`Producto agregado correctamente`};
        } else {
          return {error: true, msg:`Carrito con id ${cid} no existente`};
        }
      } else {
        return {error: true, msg:`Faltan datos del producto id o cantidad`};
      }
    } catch (error) {
      console.log('ERROR: ', error.message);
    }
  }
}

  