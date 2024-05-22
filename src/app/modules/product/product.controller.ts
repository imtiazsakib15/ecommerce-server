import { Request, Response } from 'express';
import {
  UpdateAProductIntoDB,
  createProductIntoDB,
  deleteAProductFromDB,
  getAllProductsFromDB,
  getSpecificProductFromDB,
} from './product.service';
import productValidationSchema from './product.validation';
import { IProduct } from './product.interface';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product: IProduct = req.body;
    // product data validation using zod
    const { data: productData, error } =
      productValidationSchema.safeParse(product);

    if (error)
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });

    const result = await createProductIntoDB(productData as IProduct);

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await getAllProductsFromDB(searchTerm as string | undefined);

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term ${searchTerm} fetched successfully!`
        : 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getSpecificProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await getSpecificProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const UpdateAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product: IProduct = req.body;

    // product data validation using zod
    const { data: productData, error } =
      productValidationSchema.safeParse(product);

    if (error)
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });

    const result = await UpdateAProductIntoDB(productId, productData);

    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
    }
    res.status(404).json({
      success: false,
      message: 'Product not found',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const deleteAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await deleteAProductFromDB(productId);

    if (result)
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    res.status(404).json({
      success: false,
      message: 'Product not found',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export {
  createProduct,
  getAllProducts,
  getSpecificProduct,
  UpdateAProduct,
  deleteAProduct,
};
