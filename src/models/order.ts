import client from '../database';

type Order = {
  id?: number | string;
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`failed to get orders, ${error}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (product_id, quantity, user_id, status) VALUES ($1, $2, $3, $4) RETURNING *';
      const newOrder = Object.values(order);
      const result = await conn.query(sql, newOrder);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create new order: ${error}`);
    }
  }
  async current(user_id: string): Promise<Order> {
    try {
      const sql =
        "SELECT * FROM orders INNER JOIN products ON orders.product_id = products.id WHERE user_id=($1) AND status=('active')";
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get order with id ${user_id}: ${error}`);
    }
  }
  // Completed orders by user
  async completed(user_id: string): Promise<Order> {
    try {
      const sql =
        "SELECT * FROM orders INNER JOIN products ON orders.product_id = products.id WHERE user_id=($1) AND status=('completed')";
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get order with id ${user_id}: ${error}`);
    }
  }
}
