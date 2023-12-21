import { Router } from 'express';
import { ProductsController } from '../controller/products.controller.js';
import { authorize, authenticate } from '../config/auth.js';
import { ROLE_ADMIN, ROLE_PREMIUM } from '../clases/constant.js';

const router = Router();

router.get('/', ProductsController.getProducts);

router.get('/:pid', ProductsController.getById);

router.post('/', authenticate('jwtAuth'), authorize([ROLE_ADMIN, ROLE_PREMIUM]), ProductsController.addProduct);

router.put('/:id', authenticate('jwtAuth'), authorize([ROLE_ADMIN]), ProductsController.update);

router.delete('/:id',authenticate('jwtAuth'), authorize([ROLE_ADMIN, ROLE_PREMIUM]), ProductsController.delete);

router.post('/mockingproducts', ProductsController.productsMock);

export { router as productsRouter };
