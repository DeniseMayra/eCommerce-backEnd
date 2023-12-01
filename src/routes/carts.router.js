import { Router } from 'express';
import { CartsController } from '../controller/carts.controller.js';
import { authenticate, authorize } from '../config/auth.js';
import { ROLE_USER } from '../clases/constant.js';

const router = Router();

router.post('/', CartsController.create);

router.get('/:cid', CartsController.getById);

router.post('/:cid/products/:pid', authenticate('jwtAuth'), authorize([ROLE_USER]), CartsController.addProduct);

router.delete('/:cid/products/:pid', authenticate('jwtAuth'), authorize([ROLE_USER]), CartsController.deleteProduct);

router.get('/', CartsController.getAllCarts);

router.delete('/:id', CartsController.deleteCart);

router.post('/:cid/purchase', authenticate('jwtAuth'), CartsController.purchaseCart);

router.get('/tickets', CartsController.getTickets);

export { router as cartsRouter };
