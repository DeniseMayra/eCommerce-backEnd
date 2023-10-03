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
      throw new Error(error.message);
    }
  }

  getProducts = async() => {
    try{
      const result = await this.model.find();
      return result;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  getProductById = async(id) => {
    try{
      const result = await this.model.findById(id);
      return result;

    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new Error('Id no encontrado');
      } else {
        throw new Error(error.message);
      }
    }
  }

  updateProduct = async (id, objectModify) => {
    try {
      // new:true me devuelve el producto ya modificado
      // si paso un solo dato tendria que hacer .updateOne({_id:id}, {$set filtrado}) porque findeandup se actualiza todo el doc, hay que pasar todos los datos
      const result = await this.model.findByIdAndUpdate( id, objectModify, {new:true});
      return result;

    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new Error('Id no encontrado');
      } else {
        throw new Error(error.message);
      }
    }
  }

  deleteProduct = async (id) => {
    try{
      const result = await this.model.findByIdAndDelete(id);
      return result;

    } catch (error){
      if (error.kind === 'ObjectId') {
        throw new Error('Id no encontrado');
      } else {
        throw new Error(error.message);
      }
    }
  }
};

