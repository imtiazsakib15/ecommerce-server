import express, { Application, Request, Response } from 'express';

const app: Application = express();

// parsers
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.send({ success: true, message: 'Server is working perfectly!' });
});
app.get('/*', (req: Request, res: Response) => {
  res.send({ success: false, message: 'Route not found!' });
});

export default app;
