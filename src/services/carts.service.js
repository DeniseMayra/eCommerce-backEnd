import { cartsDAOmongo } from '../dao/dao-mongo-manager.js';
import { cartsDAOfs } from '../dao/dao-fs-manager.js';

const mongo = true;
let daoManager = cartsDAOmongo;
if (!mongo){
  daoManager = cartsDAOfs;
}

export class CartsService {

  static create() {
    return daoManager.createCart();
  }

  static getById(cid) {
    return daoManager.getProductByCartId(cid);
  }

  static addProduct(cid, newProduct) {
    return daoManager.addProductInCart(cid, newProduct);
  }

  static deleteProduct(cid, pid) {
    return daoManager.deleteProductFromCart(cid, pid);
  }

  static getAllCarts() {
    return daoManager.getAllCarts();
  }

  static deleteCart(cid) {
    return daoManager.deleteCart(cid);
  }
}
