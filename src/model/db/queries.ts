import pool from './pool';
import { CategoryType, ItemType, queriesType, queryType } from '../../types';

const queries: queriesType = {
  allCategories: { query: 'SELECT * FROM categories;' },
  allItems: { query: 'SELECT * FROM items;' }
};

async function makeQuery<T>(query: queryType): Promise<T[]> {
  const { rows } = query.params
    ? await pool.query(query.query, query.params)
    : await pool.query(query.query);
  return rows;
}

export async function queryAllCategories(): Promise<CategoryType[]> {
  return await makeQuery<CategoryType>(queries.allCategories);
}

export async function queryAllItems(): Promise<ItemType[]> {
  return await makeQuery<ItemType>(queries.allItems);
}
