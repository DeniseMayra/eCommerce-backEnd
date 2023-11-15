import { Router } from 'express';
import { CartsController } from '../controller/carts.controller.js';

const router = Router();

router.post('/', CartsController.create);

router.get('/:cid', CartsController.getById);

router.post('/:cid/products/:pid', CartsController.addProduct);

router.delete('/:cid/products/:pid', CartsController.addProduct);

router.get('/', CartsController.getAllCarts);

router.delete('/:id', CartsController.deleteCart);

export { router as cartsRouter };
