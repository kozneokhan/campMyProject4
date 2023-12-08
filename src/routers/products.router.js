// 라우터 설정

import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { needSignin } from '../middlewares/need-signin.middleware.js';

const router = Router();
const productsController = new ProductsController();

router.post('', needSignin, productsController.createProduct);
router.get('', productsController.getProducts);
router.get('/:productId', productsController.getProductById);
router.put('/:productId', needSignin, productsController.updateProduct);
router.delete('/:productId', needSignin, productsController.deleteProduct);

export default router;
