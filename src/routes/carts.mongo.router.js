import { Router } from 'express';
import { cartsService } from '../dao/mongo/services.js';
import { ERROR, SUCCESS } from '../clases/constant.js';

const router = Router();

router.post('/', async (req,res) => {
  try{
    const result = await cartsService.createCart(); //object
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.get('/:cid', async (req,res) => {
  try{
    const result = await cartsService.getProductByCartId(req.params.cid); //object
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.post('/:cid/products/:pid', async (req,res) => {
  try{
    const { quantity } = req.body;
    const newProduct = {
      product: req.params.pid,
      quantity: quantity ?? 1
    };
    const result = await cartsService.addProductInCart(req.params.cid, newProduct); //object
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

// missing in file system router
router.delete('/:cid/products/:pid', async (req,res) => {
  try{
    const result = await cartsService.deleteProductFromCart(req.params.cid, req.params.pid); //object
    res.json({status: SUCCESS, data: result, message: ''});
  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.get('/', async (req,res) => {
  try{
    const result = await cartsService.getAllCarts(); //array
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

// new endpoint only here
router.delete('/:id', async (req,res) => {
  try {
    const result = await cartsService.deleteCart(req.params.id);
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
})

export { router as cartsRouterMongo };
