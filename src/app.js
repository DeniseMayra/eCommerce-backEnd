import express from 'express';
import { engine } from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { __dirname } from './utils.js';
import { DbConection } from './config/dbConnection.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { messageRouter } from './routes/messages.router.js';
import { viewsPassportRouter } from './routes/views-passport.router.js';
import { sessionPassportRouter } from './routes/session-passport.router.js';
import { initializePassport } from './config/passportConfig.js';


// ---------- CONFIG ----------
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors()); // {origin: 'http://127.0.01:4000'}
app.use(cookieParser());


// ---------- PASSPORT ----------
initializePassport();
app.use(passport.initialize());


// ---------- DATA BASE ----------
DbConection.getInstance();
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/message', messageRouter);

app.use('/', viewsPassportRouter);
app.use('/api/sessions', sessionPassportRouter);


// ---------- VIEWS ----------
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));


// ---------- SERVER ----------
app.listen(port, () => console.log('Server funcionando en el puerto ' + port));
