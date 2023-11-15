import { Router } from 'express';
import { ProductsController } from '../controller/products.controller.js';

const router = Router();

router.get('/', ProductsController.getProducts);

router.get('/:pid', ProductsController.getById);

router.post('/', ProductsController.addProduct);

router.put('/:id', ProductsController.update);

router.delete('/:id', ProductsController.delete);

export { router as productsRouter };
