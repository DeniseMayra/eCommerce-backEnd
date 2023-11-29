import { cartsDAO } from '../dao/dao-manager.js';

export class CartsService {
// usa funcion flecha
  static create() {
    return cartsDAO.createCart();
  }

  static getById(cid) {
    return cartsDAO.getProductByCartId(cid);
  }

  static addProduct(cid, newProduct) {
    return cartsDAO.addProductInCart(cid, newProduct);
  }

  static deleteProduct(cid, pid) {
    return cartsDAO.deleteProductFromCart(cid, pid);
  }

  static getAllCarts() {
    return cartsDAO.getAllCarts();
  }

  static deleteCart(cid) {
    return cartsDAO.deleteCart(cid);
  }
}
