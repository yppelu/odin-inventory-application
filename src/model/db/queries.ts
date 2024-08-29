import pool from './pool';
import {
  addCategoryFormReturnType,
  CategoryType,
  ItemType,
  queriesType
} from '../../types';

const queries: queriesType = {
  selectAllCategories: 'SELECT * FROM categories;',
  selectAllItems: 'SELECT * FROM items;',
  insertNewCategory:
    'INSERT INTO categories (name, description, image) VALUES ($1, $2, $3) RETURNING *;'
};

async function makeQuery<T>(
  query: string,
  params?: (string | null)[]
): Promise<T[]> {
  const { rows } = params
    ? await pool.query(query, params)
    : await pool.query(query);
  return rows;
}

export async function getAllCategories(): Promise<CategoryType[]> {
  return await makeQuery<CategoryType>(queries.selectAllCategories);
}

export async function getAllItems(): Promise<ItemType[]> {
  return await makeQuery<ItemType>(queries.selectAllItems);
}

export async function addNewCategory(
  params: addCategoryFormReturnType
): Promise<CategoryType> {
  const createdCategories = await makeQuery<CategoryType>(
    queries.insertNewCategory,
    Object.values(params)
  );
  return createdCategories[0];
}
