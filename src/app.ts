import express, { Application, Request, Response } from 'express';
import { productRoutes } from './app/modules/product/product.route';
import { orderRoutes } from './app/modules/order/order.route';

const app: Application = express();

// parsers
app.use(express.json());

// application routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({ success: true, message: 'Server is working perfectly!' });
});
app.get('/*', (req: Request, res: Response) => {
  res.send({
    success: false,
    message: 'Route not found',
  });
});

export default app;
