
import { CustomErrorService } from '../../../services/customError.service.js';
import { productModel } from '../models/product.model.js';

export class ProductManagerMongo {
  constructor() {
    this.model = productModel;
  };

  addProduct = async(object) => { 
    try{
      const result = await this.model.create(object);
      return result;

    } catch (error) {
      CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});
    }
  }

  getProductsArray = async () => {
    try {
      const result = await this.model.find();
      return result;
      
    } catch (error) {
      CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});
    }
  }

  getProducts = async(query, paginationOptions ) => {
    try{
      const result = await this.model.paginate(query, {...paginationOptions, lean: true});
      return result;

    } catch (error) {
      CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});
    }
  }

  getProductById = async(id) => {
    try{
      const result = await this.model.findById(id);
      return result;

    } catch (error) {
      if (error.kind === 'ObjectId') {
        CustomErrorService.createIdNotFoundError(error.value);
      } else {
        CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});
      }
    }
  }

  updateProduct = async (id, objectModify) => {
    try {
      // si paso un solo dato tendria que hacer .updateOne({_id:id}, {$set filtrado}) porque findeandup se actualiza todo el doc, hay que pasar todos los datos
      const result = await this.model.findByIdAndUpdate( id, objectModify, {new:true});
      return result;

    } catch (error) {
      if (error.kind === 'ObjectId') {
        CustomErrorService.createIdNotFoundError(id);
      } else {
        CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});
      }
    }
  }

  deleteProduct = async (id) => {
    try{
      const result = await this.model.findByIdAndDelete(id);
      return result;

    } catch (error){
      if (error.kind === 'ObjectId') {
        CustomErrorService.createIdNotFoundError(id);
      } else {
        CustomErrorService.createError({cause: error.reason, message, errorCode: ErrorEnum.DATABSE_ERROR});
      }
    }
  }
};

