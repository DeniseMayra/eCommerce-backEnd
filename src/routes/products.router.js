import { Router } from 'express';
import { ERROR, SUCCESS } from '../clases/constant.js';
import { ProductManager } from '../dao/fileSystem/manager/productManager.js';

const productRouter = Router();
const manager = new ProductManager('./dao/fileSystem/files/productos.json');

productRouter.get('/', async (req,res) => {
  try{
    const products = await manager.getProducts();
    const limit = req.query.limit;
    if (limit){
      res.json({status: SUCCESS, data: products.slice(0, limit), message: ''});
    } else {
      res.json({status: SUCCESS, data: products, message: ''});
    }

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

productRouter.get('/:pid', async (req, res) => {
  try{
    const result = await manager.getProductById(req.params.pid);
    if (result.error){
      res.status(500).json({stauts: ERROR, data: null, message: result.message});
    } else {
      res.json({status: SUCCESS, data: result.product, message: ''});
    }

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

productRouter.post('/', async(req,res) => {
  try{
    const result = await manager.addProduct(req.body);

    if (result.error){
      res.status(500).json({stauts: ERROR, data: null, message: result.message});
    } else {
      res.json({status: SUCCESS, data: result.product, message: ''});
    }

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

productRouter.put('/:pid', async(req,res) => {
  try{
    const result = await manager.updateProduct(req.params.pid, req.body);

    if (result.error){
      res.status(500).json({stauts: ERROR, data: null, message: result.message});
    } else {
      res.json({status: SUCCESS, data: result.product, message: ''});
    }
  
  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

productRouter.delete('/:pid', async(req,res) => {
  try{
    const result = await manager.deleteProduct(req.params.pid);
    if (result.error){
      res.status(500).json({stauts: ERROR, data: null, message: result.message});
    } else {
      res.json({status: SUCCESS, data: result.product, message: ''});
    }
  
  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
});

export { productRouter };
