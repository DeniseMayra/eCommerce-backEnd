import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import { __dirname } from './utils.js';
import { connectDB } from './config/dbConnection.js';
import { productRouter } from './routes/products.router.js';
import { productsRouterMongo } from './routes/products.mongo.router.js';
import { cartRouter } from './routes/carts.router.js';
import { cartsRouterMongo } from './routes/carts.mongo.router.js';
import { messageRouterMongo } from './routes/messages.mongo.router.js';
import { viewsRouter } from './routes/views.router.js';
import { viewsPassportRouter } from './routes/views-passport.router.js';
import { sessionRouter } from './routes/sessions.router.js';
import { sessionPassportRouter } from './routes/session-passport.router.js';
import { initializePassport } from './config/passportConfig.js';
import { config } from './config/config.js';

const isDBSystem = true;
const sessionWithPassport = true;

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
    mongoUrl: config.mongo.url
  }),
  secret: config.server.secretSession,
  resave: true,
  saveUninitialized: true
}));


// ---------- PASSPORT ----------
if (sessionWithPassport){
  initializePassport();
  app.use(passport.initialize());
  app.use(passport.session());
}


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
if (sessionWithPassport){
  app.use('/', viewsPassportRouter);
  app.use('/api/sessions', sessionPassportRouter);
} else {
  app.use('/', viewsRouter);
  app.use('/api/sessions', sessionRouter);
}


// ---------- VIEWS ----------
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));


// ---------- SERVER ----------
app.listen(port, () => console.log('Server funcionando en el puerto ' + port));
