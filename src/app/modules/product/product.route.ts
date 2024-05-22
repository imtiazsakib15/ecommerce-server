import express from 'express';
import {
  createProduct,
  getAllProducts,
  getSpecificProduct,
} from './product.controller';

const router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

router.get('/:productId', getSpecificProduct);

export const productRoutes = router;
