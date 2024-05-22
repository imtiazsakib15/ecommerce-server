import express from 'express';
import {
  UpdateAProduct,
  createProduct,
  deleteAProduct,
  getAllProducts,
  getSpecificProduct,
} from './product.controller';

const router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

router.get('/:productId', getSpecificProduct);

router.put('/:productId', UpdateAProduct);

router.delete('/:productId', deleteAProduct);

export const productRoutes = router;
