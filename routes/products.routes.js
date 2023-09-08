import { Router } from 'express';
import { ProductManager } from '../manager/productManager.js';

const productRouter = Router();
const manager = new ProductManager('./files/productos.json');

productRouter.get('/', async (req,res) => {
  try{
    const products = await manager.getProducts();
    const limit = req.query.limit;
    if (limit){
      res.json({data:products.slice(0, limit)});
    } else {
      res.json({data:products});
    }

  } catch (error) {
    console.log('ERROR: ', error.message);
  }
});

productRouter.get('/:pid', async (req, res) => {
  try{
    res.json(await manager.getProductById(req.params.pid));
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
});

productRouter.post('/', async(req,res) => {
  try{
    res.json(await manager.addProduct(req.body));
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
})

productRouter.put('/:pid', async(req,res) => {
  try{
    res.json(await manager.updateProduct(req.params.pid, req.body));
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
})

productRouter.delete('/:pid', async(req,res) => {
  try{
    res.json(await manager.deleteProduct(req.params.pid));
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
})

export { productRouter };
