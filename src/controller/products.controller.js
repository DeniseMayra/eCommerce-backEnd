import { ProductsService } from '../services/products.service.js';

export class ProductsController {

  static getProducts = async (req, res) => {
    try{
      const response = await ProductsService.getProductsMongo(req);
      res.json(response);
      
    } catch (error) {
      res.status(500).json({error: false, payload: null, message: error.message});
    }
  };

  static getById = async(req, res) => {
    try{
      const result = await ProductsService.getById(req.params.pid); //object
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static addProduct = async(req,res) => {
    try{
      const result = await ProductsService.addProduct(req.body); //object
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static update = async(req,res) => {
    try{
      const result = await ProductsService.update(req.params.id, req.body); //object
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static delete = async(req,res) => {
    try{
      const result = await ProductsService.delete(req.params.id);  //objeto eliminado
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
}
