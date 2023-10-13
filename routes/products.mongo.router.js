import { Router } from 'express';
import { productsService } from '../dao/mongo/services.js';
import { ERROR, SUCCESS } from '../clases/constant.js';

const router = Router();

router.get('/', async (req, res) => {
  try{
    const { limit=10, page=1, sort=1 } = req.query;
    const query = {};
    const paginattionOpt = {
      limit,
      page,
      sort: {price: sort}
    }
    const result = await productsService.getProducts( query, paginattionOpt ); //array
    const response = {
      status: SUCCESS,
      payload: result.docs,
      totalPages: result.totalPages, page: result.page, hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage, prevPage: result.prevPage, nextPage: result.nextPage,
      prevLink: result.hasPrevPage ? '' : null,
      nextLink: result.hasNextPage ? '' : null
    }
    
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
})

router.put('/:id', async(req,res) => {
  try{
    const result = await productsService.updateProduct(req.params.id, req.body); //object
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
})

router.delete('/:id', async(req,res) => {
  try{
    const result = await productsService.deleteProduct(req.params.id);  //objeto eliminado
    res.json({status: SUCCESS, data: result, message: ''});

  } catch (error) {
    res.status(500).json({stauts: ERROR, data: null, message: error.message});
  }
})

export { router as productsRouterMongo };
