import { ErrorEnum } from '../enums/error.enum.js';
import { CustomErrorService } from '../services/customError.service.js';
import { productRequired } from '../services/errorCauses.service.js';
import { ProductsService } from '../services/products.service.js';
import { generateProducts } from '../assets/mocks/productMock.js';
import { ROLE_ADMIN, ROLE_PREMIUM } from '../clases/constant.js';
import { sendDeleteProductEmail } from '../helpers/email.js';

export class ProductsController {

  static getProducts = async (req, res) => {
    try{
      const response = await ProductsService.getProductsMongo(req);
      res.json(response);
      
    } catch (error) {
      res.status(500).json({error: true, payload: null, message: error.message});
    }
  };

  static getAllProducts = async (req, res) => {
    try{
      const response = await ProductsService.getProductsArray();
      res.json(response);
      
    } catch (error) {
      res.status(500).json({error: true, payload: null, message: error.message});
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
      const product = req.body;
      if (!product.title || !product.price || !product.stock || !product.category || !product.code){
        CustomErrorService.createError({name: 'Create Product Error', cause:'Falta uno o mas campos',
          message: productRequired(product), errorCode: ErrorEnum.INVALID_BODY_JSON})
      }
      product.owner = req.user._id;

      const result = await ProductsService.addProduct(product); //object
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
      const product = await ProductsService.getById(req.params.id);
      if ( req.user.role === ROLE_PREMIUM && product.owner === req.user._id || req.user.role === ROLE_ADMIN ){
        const result = await ProductsService.delete(req.params.id);  //objeto eliminado

        if ( product.owner.role === ROLE_PREMIUM ){
          sendDeleteProductEmail(product, product.owner.email);
        }
        res.json({error: false, data: result, message: ''});

      } else {
        res.status(401).json({error: true, data: null, message: 'No autorizado a eliminar el producto'});
      }

    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static productsMock = async (req,res) => {
    try {
      const productsMock = [];
      for ( let i=0; i<10; i++){
        productsMock.push(generateProducts());
      }
  
      res.json({mock: productsMock});

    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
}
