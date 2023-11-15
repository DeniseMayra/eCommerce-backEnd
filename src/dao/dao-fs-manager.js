import { ProductManager } from './fileSystem/manager/productManager.js';
import { CartManager } from './fileSystem/manager/cartManager.js';

export const productsDAOfs = new ProductManager(); 
export const cartsDAOfs= new CartManager();

// To Do: createMessages and user manager
