import { Router } from 'express';
import { productsService } from '../dao/mongo/services.js';
import { ERROR, SUCCESS } from '../clases/constant.js';
import { getProductsMongo } from '../clases/router-functions.js';

const router = Router();

router.get('/', async (req, res) => {
  try{
    const response = await getProductsMongo(req);
    res.json(response);
   
  } catch (error) {
    res.status(500).json({stauts: ERROR, payload: null, message: error.message});
  }
});

router.get('/:pid', async(req, res) => {
  try{
    const result = await productsService.getProductById(req.params.pid); //object
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.post('/', async(req,res) => {
  try{
    const result = await productsService.addProduct(req.body); //object
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.put('/:id', async(req,res) => {
  try{
    const result = await productsService.updateProduct(req.params.id, req.body); //object
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

router.delete('/:id', async(req,res) => {
  try{
    const result = await productsService.deleteProduct(req.params.id);  //objeto eliminado
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

export { router as productsRouterMongo };
