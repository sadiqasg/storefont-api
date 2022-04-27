import { Application, Request, Response } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { OrderStore } from '../models/order';

const store = new OrderStore();
export const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    if (!orders.length) {
      return res.json({ message: 'No orders' });
    }
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.json('request failed');
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const order = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      status: 'active',
    };
    const newProduct = await store.create(order);
    res.json({ status: 201, newProduct });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Could not add new product' });
  }
};

export const current = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const result = await store.current(userId);
    if (result) return res.json({ status: 200, result });
    return res.json({ message: 'No active orders found for this user' });
  } catch (error) {
    console.error(error);
    res.json({
      message: `Could not get current orders for User ID: ${userId}`,
    });
  }
};

export const completed = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const result = await store.completed(userId);
    if (result) return res.json({ status: 200, result });
    return res.json({ message: 'No completed orders found for this user' });
  } catch (error) {
    console.error(error);
    res.json({
      message: `Could not get completed orders for User ID: ${userId}`,
    });
  }
};

const orderRoutes = (app: Application) => {
  app.get('/orders', index);
  app.post('/orders', verifyToken, create);
  app.get('/users/:id/current-orders', current);
  app.get('/users/:id/completed-orders', completed);
};

export default orderRoutes;
