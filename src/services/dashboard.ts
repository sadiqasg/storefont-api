import client from '../database';
import { Product } from '../models/product';

export class DashboardQueries {
  // top 5 most popular products
  async topFive(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async category(product_category: string): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE category = ($1)';
      const result = await conn.query(sql, [product_category]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }
}
