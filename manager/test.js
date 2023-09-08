import { CartManager } from './cartManager.js';
import { ProductManager } from './productManager.js';

async function test() {

  const prod = new ProductManager('./files/productos.json');
  const cart = new CartManager('./files/carritos.json');
  // console.log(await prod.getProducts());

  // const newprod = {
  //   title: 'Casco Smk',
  //   description: 'Stellar Classic',
  //   price: 106,
  //   status: true,
  //   thumbnails: [
  //     'https://http2.mlstatic.com/D_NQ_NP_888566-MLA31036060970_062019-O.webp'
  //   ],
  //   stock: 22,
  //   category: 'acc',
  //   code: '1111'
  // };

  // console.log(await prod.updateProduct("4e36c059-47aa-46c4-bfc6-be6fd3f59c2b", newprod));

  // console.log(await cart.getAllCarts());

  const id = 'eee52c14-c7da-4f7d-9f84-6349f1645e5c';
  const productToAdd = {
    product: '12345',
    quantity: 1
  }
  // console.log(await cart.addProductInCart(id, productToAdd));
  console.log(await cart.getProductByCartId(id));

}

test();
