import { ProductManagerMongo } from './mongo/manager/productManagerMongo.js';
import { CartManagerMongo } from './mongo/manager/cartManagerMongo.js';
import { MessageManagerMongo } from './mongo/manager/messagesManagerMongo.js';
import { UsersManagerMongo } from './mongo/manager/usersManagerMongo.js';

export const productsDAOmongo = new ProductManagerMongo(); 
export const cartsDAOmongo = new CartManagerMongo();
export const messageDAOmongo = new MessageManagerMongo();
export const usersDAOmongo = new UsersManagerMongo();
