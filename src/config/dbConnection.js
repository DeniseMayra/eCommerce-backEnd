import mongoose from 'mongoose';
import { config } from './config.js';
import { logger } from '../helpers/logger.js';

export class DbConection {
  static #instance
  
  static async #connect() {
    await mongoose.connect(config.mongo.url);
  }
  
  static getInstance() {
    if (this.#instance){
      logger.info('Db ya conectada');
    } else {
      this.#instance = this.#connect();
      logger.info('DB conectada');
    }
    return this.#instance;
  }
}
