import { IOrder } from './order.interface';
import Order from './order.model';

const createOrderIntoDB = async (order: IOrder) => {
  const result = await Order.create(order);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

export { createOrderIntoDB, getAllOrdersFromDB };
