import { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { verifyToken } from '../middlewares/verifyToken';
import { ProductStore } from '../models/product';

dotenv.config();

const store = new ProductStore();

export const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    if (products.length < 1) {
      return res.json({ message: 'There are no products in the store' });
    }
    res.json({ status: 200, products });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Failed to get products' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await store.create(product);
    res.json({ status: 201, newProduct });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Could not add new product' });
  }
};

export const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await store.show(id);
    if (!result) {
      return res.json({ message: 'No product with that id' });
    }
    res.json({ status: 200, data: result });
  } catch (error) {
    throw new Error(`Failed to get product with id: ${id}`);
  }
};

const productRoutes = (app: Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyToken, create);
};

export default productRoutes;
