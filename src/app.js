import express from 'express';
import { engine } from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { __dirname } from './utils.js';
import { connectDB } from './config/dbConnection.js';
import { productRouter } from './routes/products.router.js';
import { productsRouterMongo } from './routes/products.mongo.router.js';
import { cartRouter } from './routes/carts.router.js';
import { cartsRouterMongo } from './routes/carts.mongo.router.js';
import { messageRouterMongo } from './routes/messages.mongo.router.js';
import { viewsPassportRouter } from './routes/views-passport.router.js';
import { sessionPassportRouter } from './routes/session-passport.router.js';
import { initializePassport } from './config/passportConfig.js';

const isDBSystem = true;

// ---------- CONFIG ----------
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());


// ---------- PASSPORT ----------
initializePassport();
app.use(passport.initialize());


// ---------- DATA BASE ----------
if (isDBSystem){
  connectDB();
  app.use('/api/carts', cartsRouterMongo);
  app.use('/api/products', productsRouterMongo);
  app.use('/api/message', messageRouterMongo);
} else {
  app.use('/api/carts', cartRouter);
  app.use('/api/products', productRouter);
}
app.use('/', viewsPassportRouter);
app.use('/api/sessions', sessionPassportRouter);


// ---------- VIEWS ----------
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));


// ---------- SERVER ----------
app.listen(port, () => console.log('Server funcionando en el puerto ' + port));
