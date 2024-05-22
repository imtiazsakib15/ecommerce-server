import express from 'express';
import {
  createProduct,
  deleteAProduct,
  getAllProducts,
  getSpecificProduct,
} from './product.controller';

const router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

router.get('/:productId', getSpecificProduct);

router.delete('/:productId', deleteAProduct);

export const productRoutes = router;
