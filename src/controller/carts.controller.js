import { CartsService } from '../services/carts.service.js';

export class CartsController {

  static create = async (req,res) => {
    try{
      const result = await CartsService.create(); //object
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
  
  static getById = async (req,res) => {
    try{
      const result = await CartsService.getById(req.params.cid); //object
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
  
  static addProduct = async (req,res) => {
    try{
      const { quantity } = req.body;
      const newProduct = {
        product: req.params.pid,
        quantity: quantity ?? 1
      };
      const result = await CartsService.addProduct(req.params.cid, newProduct); //object
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
  
  static deleteProduct = async (req,res) => {
    try{
      const result = await CartsService.deleteProduct(req.params.cid, req.params.pid); //object
      res.json({error: false, data: result, message: ''});
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static getAllCarts = async (req,res) => {
    try{
      const result = await CartsService.getAllCarts(); //array
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static deleteCart = async (req,res) => {
    try {
      const result = await CartsService.deleteCart(req.params.id);
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
}
