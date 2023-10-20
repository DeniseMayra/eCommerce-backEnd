import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async() => {
  try {
    await mongoose.connect(config.mongo.url);
    console.log('DB conectado correctamente');
  } catch (error) {
    console.log(`Error al conectar a DB: ${error.message}`);
  }
};
