import express from 'express';
import { createProduct } from './product.controller';

const router = express.Router();

router.post('/', createProduct);

export const productRoutes = router;
