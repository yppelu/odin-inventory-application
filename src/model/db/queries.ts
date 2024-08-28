import pool from './pool';
import { CategoryType, ItemType, queriesType, queryType } from '../../types';

const queries: queriesType = {
  selectAllCategories: { query: 'SELECT * FROM categories;' },
  selectAllItems: { query: 'SELECT * FROM items;' }
};

async function makeQuery<T>(query: queryType): Promise<T[]> {
  const { rows } = query.params
    ? await pool.query(query.query, query.params)
    : await pool.query(query.query);
  return rows;
}

export async function getAllCategories(): Promise<CategoryType[]> {
  return await makeQuery<CategoryType>(queries.selectAllCategories);
}

export async function getAllItems(): Promise<ItemType[]> {
  return await makeQuery<ItemType>(queries.selectAllItems);
}

export async function insertNewCategory() {}
