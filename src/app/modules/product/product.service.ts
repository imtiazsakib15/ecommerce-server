import { IProduct } from './product.interface';
import Product from './product.model';

const createProductIntoDB = async (product: IProduct) => {
  const result = await Product.create(product);
  return result;
};

export { createProductIntoDB };
