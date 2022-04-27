import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './handlers/user';
import productRoutes from './handlers/product';
import dashboardRoutes from './handlers/dashboard';
import orderRoutes from './handlers/order';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

userRoutes(app);
dashboardRoutes(app);
productRoutes(app);
orderRoutes(app);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'This route does not exist' });
});

app.listen(port, (): void => {
  console.log(`Listening on ${port}`);
});
