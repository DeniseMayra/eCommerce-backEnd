import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import path from 'path';
import { __dirname } from './utils.js';
import { connectDB, mongoUrl } from './config/dbConnection.js';
import { productRouter } from './routes/products.router.js';
import { cartRouter } from './routes/carts.router.js';
import { productsRouterMongo } from './routes/products.mongo.router.js';
import { cartsRouterMongo } from './routes/carts.mongo.router.js';
import { messageRouterMongo } from './routes/messages.mongo.router.js';
import { viewsRouter } from './routes/views.router.js';
import { sessionRouter } from './routes/sessions.router.js';

const isDBSystem = true;

// ---------- CONFIG ----------
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


// ---------- SESSION ----------
app.use(session({
  store: MongoStore.create({
    ttl: 3000,
    mongoUrl: mongoUrl
  }),
  secret: 'secretKeyInMongo',
  resave: true,
  saveUninitialized: true
}));


// ---------- DATA BASE ----------
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
app.use('/api/sessions', sessionRouter)


// ---------- VIEWS ----------
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));


// ---------- SERVER ----------
app.listen(port, () => console.log('Server funcionando en el puerto ' + port));
