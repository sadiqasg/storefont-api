import { Request, Response, Application } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

export const getTopFive = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.topFive();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const category = req.params.category;
  try {
    const categories = await dashboard.category(category);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

const dashboardRoutes = (app: Application) => {
  app.get('/products/top-five', getTopFive);
  app.get('/products/:category', getCategory);
};

export default dashboardRoutes;
