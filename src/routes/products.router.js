import { Router } from 'express';
import { ProductsController } from '../controller/products.controller.js';
import { authorize, authenticate } from '../config/auth.js';
import { ROLE_ADMIN } from '../clases/constant.js';

const router = Router();

router.get('/', ProductsController.getProducts);

router.get('/:pid', ProductsController.getById);

router.post('/', authenticate('jwtAuth'), authorize([ROLE_ADMIN]), ProductsController.addProduct);

router.put('/:id', authenticate('jwtAuth'), authorize([ROLE_ADMIN]), ProductsController.update);

router.delete('/:id', authorize([ROLE_ADMIN]), ProductsController.delete);

router.post('/mockingproducts', ProductsController.productsMock);

export { router as productsRouter };
