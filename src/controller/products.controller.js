import { ErrorEnum } from '../enums/error.enum.js';
import { CustomErrorService } from '../services/customError.service.js';
import { productRequired } from '../services/errorCauses.service.js';
import { ProductsService } from '../services/products.service.js';
import { generateProducts } from '../assets/mocks/productMock.js';

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
      if (!req.body.title || !req.body.price || !req.body.stock || !req.body.category || !req.body.code){
        CustomErrorService.createError({name: 'Create Product Error', cause:'Falta uno o mas campos',
          message: productRequired(req.body), errorCode: ErrorEnum.INVALID_BODY_JSON})
      }

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

  static productsMock = async (req,res) => {
    try {
      const productsMock = [];
      for ( let i=0; i<100; i++){
        productsMock.push(generateProducts());
      }
  
      res.json({mock: productsMock});

    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
}
