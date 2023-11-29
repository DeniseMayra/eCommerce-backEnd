import { Router } from 'express';
import { ProductsController } from '../controller/products.controller.js';
import { authorize } from '../config/auth.js';
import { ROLE_ADMIN } from '../clases/constant.js';

const router = Router();

router.get('/', ProductsController.getProducts);

router.get('/:pid', ProductsController.getById);

router.post('/', authorize(ROLE_ADMIN), ProductsController.addProduct);

router.put('/:id', authorize(ROLE_ADMIN), ProductsController.update);

router.delete('/:id', authorize(ROLE_ADMIN), ProductsController.delete);

export { router as productsRouter };
