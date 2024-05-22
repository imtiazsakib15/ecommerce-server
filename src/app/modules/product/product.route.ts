import express from 'express';
import { createProduct, getAllProducts } from './product.controller';

const router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

export const productRoutes = router;
