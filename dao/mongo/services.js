import { ProductManagerMongo } from './manager/productManagerMongo.js';
import { CartManagerMongo } from './manager/cartManagerMongo.js';
import { messageManagerMongo } from './manager/messagesManagerMongo.js';

export const productsService = new ProductManagerMongo(); 
export const cartsService = new CartManagerMongo();
export const messageService = new messageManagerMongo();
