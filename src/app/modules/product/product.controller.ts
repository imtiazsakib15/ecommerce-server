import { Request, Response } from 'express';
import { createProductIntoDB } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await createProductIntoDB(product);

    res.status(201).json({
      success: true,
      message: 'Product saved to database successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
      error,
    });
  }
};

export { createProduct };
