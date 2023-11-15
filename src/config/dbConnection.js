import mongoose from 'mongoose';
import { config } from './config.js';

export class DbConection {
  static #instance
  
  static async #connect() {
    await mongoose.connect(config.mongo.url);
  }
  
  static getInstance() {
    if (this.#instance){
      console.log('Db ya conectada');
    } else {
      this.#instance = this.#connect();
      console.log('DB conectada');
    }
    return this.#instance;
  }
}
