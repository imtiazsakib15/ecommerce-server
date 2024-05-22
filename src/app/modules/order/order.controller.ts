import { Request, Response } from 'express';
import { createOrderIntoDB, getAllOrdersFromDB } from './order.service';
import { IOrder } from './order.interface';
import {
  UpdateAProductIntoDB,
  getSpecificProductFromDB,
} from '../product/product.service';
import { IProduct } from '../product/product.interface';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: IOrder = req.body;

    // order data validation using zod
    const { data: orderData, error } = orderValidationSchema.safeParse(order);

    if (error)
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });

    const product: IProduct | null = await getSpecificProductFromDB(
      orderData.productId,
    );
    if (!product)
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    if (product.inventory.quantity < orderData.quantity)
      return res.status(404).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });

    await createOrderIntoDB(orderData);

    product.inventory.quantity -= orderData.quantity;
    if (product.inventory.quantity === 0) product.inventory.inStock = false;

    await UpdateAProductIntoDB(orderData.productId, product);

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: orderData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const result = await getAllOrdersFromDB(email as string | undefined);
    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
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

export { createOrder, getAllOrders };
