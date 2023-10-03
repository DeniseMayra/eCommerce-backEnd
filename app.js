import express from 'express';
import { productRouter } from './routes/products.router.js';
import { cartRouter } from './routes/carts.router.js';
import { productsRouterMongo } from './routes/products.mongo.router.js';
import { cartsRouterMongo } from './routes/carts.mongo.router.js';
import { messageRouterMongo } from './routes/messages.mongo.router.js';
import { connectDB } from './config/dbConnection.js';

const isDBSystem = true;

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
connectDB();

if (isDBSystem){
  app.use('/api/carts', cartsRouterMongo);
  app.use('/api/products', productsRouterMongo);
  app.use('/api/message', messageRouterMongo);
} else {
  app.use('/api/carts', cartRouter);
  app.use('/api/products', productRouter);
}



app.listen(port, () => console.log('Server funcionando en el puerto ' + port));
