import { Router } from 'express';
import { CartManager } from '../dao/fileSystem/manager/cartManager.js';

const router = Router();
const manager = new CartManager('./files/carritos.json');

router.post('/', async (req,res) => {
  try{
    res.json(await manager.createCart());
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
});

router.get('/:cid', async (req,res) => {
  try{
    res.json(await manager.getProductByCartId(req.params.cid));
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
});

router.post('/:cid/products/:pid', async (req,res) => {
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

export { router as cartRouter};
