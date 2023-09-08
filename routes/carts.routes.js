import { Router } from 'express';
import { CartManager } from '../manager/cartManager.js';

const cartsRouter = Router();
const manager = new CartManager('./files/carritos.json');

cartsRouter.post('/', async (req,res) => {
  try{
    res.json(await manager.createCart());
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
});

cartsRouter.get('/:cid', async (req,res) => {
  try{
    res.json(await manager.getProductByCartId(req.params.cid));
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
});

cartsRouter.post('/:cid/products/:pid', async (req,res) => {
  try{
    const newProduct = {
      product: req.params.pid,
      ...req.body
    };
    res.json(await manager.addProductInCart(req.params.cid, newProduct));

  } catch (error) {
    console.log('ERROR: ', error.message);
  }
});

export { cartsRouter };
