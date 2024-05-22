import { Request, Response } from 'express';
import { createProductIntoDB, getAllProductsFromDB } from './product.service';
import productValidationSchema from './product.validation';
import { IProduct } from './product.interface';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    // product data validation using zod
    const { data: productData, error } =
      productValidationSchema.safeParse(product);

    if (error)
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });

    const result = await createProductIntoDB(productData as IProduct);

    res.status(201).json({
      success: true,
      message: 'Product saved to database successfully',
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
    const result = await getAllProductsFromDB();

    res.status(201).json({
      success: true,
      message: 'Product saved to database successfully',
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

export { createProduct, getAllProducts };
