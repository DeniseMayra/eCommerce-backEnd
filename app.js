import express from 'express';
import { productRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { connectDB } from './config/dbConnection.js';

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);
connectDB();



app.listen(port, () => console.log('Server funcionando en el puerto ' + port));
