import { IProduct } from './product.interface';
import Product from './product.model';

const createProductIntoDB = async (product: IProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSpecificProductFromDB = async (productId: string) => {
  const result = await Product.findById({ _id: productId });
  return result;
};

const UpdateAProductIntoDB = async (productId: string, product: IProduct) => {
  const result = await Product.findByIdAndUpdate({ _id: productId }, product);
  return result;
};

const deleteAProductFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete({ _id: productId });
  return result;
};

export {
  createProductIntoDB,
  getAllProductsFromDB,
  getSpecificProductFromDB,
  UpdateAProductIntoDB,
  deleteAProductFromDB,
};
