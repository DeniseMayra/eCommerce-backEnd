import mongoose from 'mongoose';
import { productModel } from '../src/dao/mongo/models/product.model.js';
import { config } from '../src/config/config.js';

await mongoose.connect(config.mongo.url);

const updateProducts = async () => {
  try {
    const adminId = '654abcdc2495146fc5609845';
    const results = await productModel.updateMany({}, { $set: {owner:adminId}});
    console.log('🚀 ~ file: mongo.script.js:11 ~ updateProducts ~ results:', results);
    
  } catch (error) {
    console.log(error);
  }
};

updateProducts();
