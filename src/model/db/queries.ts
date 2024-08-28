import pool from './pool';
import { CategoryType } from '../../types';

export async function queryAllCategories(): Promise<CategoryType[]> {
  const { rows } = await pool.query('SELECT * FROM categories;');
  return rows;
}
