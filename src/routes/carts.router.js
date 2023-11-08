import { Router } from 'express';
import { CartManager } from '../dao/fileSystem/manager/cartManager.js';
import { ERROR, SUCCESS } from '../clases/constant.js';

const router = Router();
const manager = new CartManager('./dao/fileSystem/files/carritos.json');

router.post('/', async (req,res) => {
  try{
    const result = await manager.createCart();
    res.json({status: SUCCESS, data: result.cart, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.get('/:cid', async (req,res) => {
  try{
    const result = await manager.getProductByCartId(req.params.cid);
    if (result.error){
      res.status(500).json({stauts: ERROR, data: null, message: result.message});
    } else {
      res.json({status: SUCCESS, data: result.cart, message: ''});
    }
    
  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.post('/:cid/products/:pid', async (req,res) => {
  try{
    const newProduct = {
      product: req.params.pid,
      ...req.body
    };
    const result = await manager.addProductInCart(req.params.cid, newProduct);
    if (result.error){
      res.status(500).json({stauts: ERROR, data: null, message: result.message});
    } else {
      res.json({status: SUCCESS, data: result.cart, message: ''});
    }

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.get('/', async (req,res) => {
  try{
    const result = await manager.getAllCarts(); //array
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

export { router as cartRouter };
