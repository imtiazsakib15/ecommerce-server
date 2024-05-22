import { IOrder } from './order.interface';
import Order from './order.model';

const createOrderIntoDB = async (order: IOrder) => {
  const result = await Order.create(order);
  return result;
};

const getAllOrdersFromDB = async (email: string | undefined) => {
  let result: Array<IOrder>;
  if (!email) result = await Order.find();
  else result = await Order.find({ email });

  return result;
};

export { createOrderIntoDB, getAllOrdersFromDB };
