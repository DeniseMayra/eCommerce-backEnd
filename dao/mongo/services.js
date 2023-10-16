import { ProductManagerMongo } from './manager/productManagerMongo.js';
import { CartManagerMongo } from './manager/cartManagerMongo.js';
import { MessageManagerMongo } from './manager/messagesManagerMongo.js';
import { UsersManagerMongo } from './manager/usersManagerMongo.js';

export const productsService = new ProductManagerMongo(); 
export const cartsService = new CartManagerMongo();
export const messageService = new MessageManagerMongo();
export const usersService = new UsersManagerMongo();
