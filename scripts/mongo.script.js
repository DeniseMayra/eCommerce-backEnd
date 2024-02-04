import mongoose from 'mongoose';
import { productModel } from '../src/dao/mongo/models/product.model.js';
import { config } from '../src/config/config.js';
import { usersModel } from '../src/dao/mongo/models/users.model.js';
import { USER_STATUS_PENDING } from '../src/clases/constant.js';

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

const updateUsers = async () => {
  try {
    const date = new Date(2024, 1, 1);
    const results = await usersModel.updateMany({last_connection: null}, { $set: {last_connection:date}});
    console.log('🚀 ~ file: mongo.script.js:11 ~ updateProducts ~ results:', results);
    
  } catch (error) {
    console.log(error);
  }
};

// updateProducts();

updateUsers();
