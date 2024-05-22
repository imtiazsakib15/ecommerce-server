import { Request, Response } from 'express';
import { createOrderIntoDB, getAllOrdersFromDB } from './order.service';
import { IOrder } from './order.interface';
import {
  UpdateAProductIntoDB,
  getSpecificProductFromDB,
} from '../product/product.service';
import { IProduct } from '../product/product.interface';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: IOrder = req.body;
    const product: IProduct | null = await getSpecificProductFromDB(
      order.productId,
    );
    if (!product)
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    if (product.inventory.quantity < order.quantity)
      return res.status(404).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });

    await createOrderIntoDB(order);

    product.inventory.quantity -= order.quantity;
    if (product.inventory.quantity === 0) product.inventory.inStock = false;

    await UpdateAProductIntoDB(order.productId, product);

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: order,
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
    const result = await getAllOrdersFromDB();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
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
