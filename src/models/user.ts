import bcrypt from 'bcrypt';
import client from '../database';

export type User = {
  id?: number | string;
  firstName: string;
  lastName: string;
  password: string;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const pepper: string = process.env.BCRYPT_PASSWORD;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const saltRounds: string = process.env.SALT_ROUNDS;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get users ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get user with id ${id}: ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }

  async authenticate(lastName: string, password: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE lastName = ($1)';
      const result = await conn.query(sql, [lastName]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          conn.release();
          return user;
        }
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }
}
