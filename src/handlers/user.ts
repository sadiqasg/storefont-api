import { Application, Request, Response } from 'express';
import { UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyToken } from '../middlewares/verifyToken';

dotenv.config();

const store = new UserStore();
// const tokenSecret: string = process.env.TOKEN_SECRET || '';
const tokenSecret = String(process.env.TOKEN_SECRET);

export const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    if (users.length < 1) {
      return res.json({ message: 'There are no users' });
    }
    res.json({ status: 200, users });
  } catch (error) {
    console.error(error);
    res.json({ message: 'failed to get users' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, tokenSecret);
    res.json({ status: 201, newUser, token });
  } catch (err) {
    console.error(err);
    res.json({ message: 'could not create user' });
  }
};

export const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await store.show(id);
    if (!result) {
      return res.json({ message: 'No user with that id' });
    }
    res.json({ status: 200, data: result });
  } catch (error) {
    throw new Error(`cannot get user with id: ${id}`);
  }
};

export const login = async (req: Request, res: Response) => {
  const lastName = req.body.lastName;
  const password = req.body.password;
  try {
    const result = await store.authenticate(lastName, password);
    if (!result) {
      return res.json({ message: 'No user with that name found' });
    }
    const token = jwt.sign({ user: result }, tokenSecret, { expiresIn: '24h' });
    res.cookie('auth_token', token);
    res.json({ result, token });
  } catch (err) {
    console.error(err);
    res.json({ status: 400, err });
  }
};

const userRoutes = (app: Application) => {
  app.get('/users', verifyToken, index);
  app.post('/users', create);
  app.post('/users/login', login);
  app.get('/users/:id', show);
};

export default userRoutes;
