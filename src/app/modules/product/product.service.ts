import { IProduct } from './product.interface';
import Product from './product.model';

const createProductIntoDB = async (product: IProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDB = async (searchTerm: string | undefined) => {
  let result: Array<IProduct>;
  if (!searchTerm) result = await Product.find();
  else
    result = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    });

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
