import express from 'express';
import { productRouter } from './routes/products.router.js';
import { engine } from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js';
import { connectDB } from './config/dbConnection.js';
import { cartRouter } from './routes/carts.router.js';
import { productsRouterMongo } from './routes/products.mongo.router.js';
import { cartsRouterMongo } from './routes/carts.mongo.router.js';
import { messageRouterMongo } from './routes/messages.mongo.router.js';
import { viewsRouter } from './routes/views.router.js';
import cors from 'cors';

const isDBSystem = true;

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

if (isDBSystem){
  connectDB();
  app.use('/api/carts', cartsRouterMongo);
  app.use('/api/products', productsRouterMongo);
  app.use('/api/message', messageRouterMongo);
  app.use('/', viewsRouter);
} else {
  app.use('/api/carts', cartRouter);
  app.use('/api/products', productRouter);
}

// ---------- VIEWS ----------
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));


app.listen(port, () => console.log('Server funcionando en el puerto ' + port));
