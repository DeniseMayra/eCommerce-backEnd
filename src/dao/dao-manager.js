import { config } from '../config/config.js';
import { TicketManagerMongo } from './mongo/manager/ticketManagerMongo.js';

let cartsDAO;
let productsDAO;
let messagesDAO;
let usersDAO;
let ticketDAO;

const persistence = config.server.persistence;

switch(persistence){
  case 'mongo':
    const { ProductManagerMongo } = await import('./mongo/manager/productManagerMongo.js');
    const { CartManagerMongo } = await import('./mongo/manager/cartManagerMongo.js');
    const { MessageManagerMongo } = await import('./mongo/manager/messagesManagerMongo.js');
    const { UsersManagerMongo } = await import('./mongo/manager/usersManagerMongo.js');
    const { TicketManagerMongo } = await import('./mongo/manager/ticketManagerMongo.js');
    productsDAO = new ProductManagerMongo();
    cartsDAO = new CartManagerMongo();
    messagesDAO = new MessageManagerMongo();
    usersDAO = new UsersManagerMongo();
    ticketDAO = new TicketManagerMongo();
    break;

  case 'fs':
    const { ProductManager } = await import('./fileSystem/manager/productManager.js');
    const { CartManager } = await import('./fileSystem/manager/cartManager.js');
    const { MessagesManager } = await import('./fileSystem/manager/messagesManager.js');
    const { UserManager } = await import('./fileSystem/manager/usersManager.js');
    const { TicketManager } = await import('./fileSystem/manager/ticketManager.js');
    productsDAO = new ProductManager('./src/dao/fileSystem/files/productos.json');
    cartsDAO = new CartManager('./src/dao/fileSystem/files/carritos.json');
    messagesDAO = new MessagesManager();
    usersDAO = new UserManager();
    ticketDAO = new TicketManager();
    break;
}

export { productsDAO, cartsDAO, messagesDAO, usersDAO, ticketDAO };
