import express from 'express';
import { engine } from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { __dirname } from './utils.js';
import { DbConection } from './config/dbConnection.js';
import { initializePassport } from './config/passportConfig.js';
import { logger } from './helpers/logger.js';
import swaggerUI from 'swagger-ui-express';
import { swaggerSpecs } from './config/swagger.config.js';

import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { messageRouter } from './routes/messages.router.js';
import { viewsPassportRouter } from './routes/views-passport.router.js';
import { sessionPassportRouter } from './routes/session-passport.router.js';
import { usersRouter } from './routes/users.router.js';


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
app.use('/api/users', usersRouter);

app.use('/', viewsPassportRouter);
app.use('/api/sessions', sessionPassportRouter);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));


// ---------- VIEWS ----------
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.get('*', (req,res) => res.render('notFound'));


// ---------- SERVER ----------
app.listen(port, () => logger.info('Server funcionando en el puerto ' + port));

app.post('/loggerTest', (req,res) => {
  logger.fatal('Log Error fatal');
  logger.error('Log Error error');
  logger.warning('Log Error warning');
  logger.info('Log Error info');
  logger.http('Log Error http');
  logger.debug('Log Error debug');

  res.send('Testing logger');
})

