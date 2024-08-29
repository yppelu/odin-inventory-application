import pool from './pool';
import {
  addCategoryFormReturnType,
  addItemFormReturnType,
  CategoryItemRelationType,
  CategoryType,
  ItemType,
  queriesType
} from '../../types';

const queries: queriesType = {
  selectAllCategories: 'SELECT * FROM categories;',
  selectAllItems: 'SELECT * FROM items;',
  insertNewCategory:
    'INSERT INTO categories (name, description, image) VALUES ($1, $2, $3) RETURNING *;',
  insertNewItem:
    'INSERT INTO items (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *;',
  insertCategoryItemRelation:
    'INSERT INTO category_item_relations (category_id, item_id) VALUES ($1, $2);'
};

async function makeQuery<T>(
  query: string,
  params?: (string | number | number[] | undefined)[]
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

export async function addItemCategoriesRelation(
  itemId: number,
  categoryIds: number | number[]
): Promise<void> {
  if (typeof categoryIds === 'number') {
    await makeQuery<CategoryItemRelationType>(
      queries.insertCategoryItemRelation,
      [categoryIds, itemId]
    );
  } else {
    Promise.all(
      categoryIds.map((categoryId) => {
        return makeQuery<CategoryItemRelationType>(
          queries.insertCategoryItemRelation,
          [categoryId, itemId]
        );
      })
    );
  }
}

export async function addNewItem({
  name,
  description,
  price,
  categoryIds,
  image
}: addItemFormReturnType): Promise<ItemType> {
  const createdItems = await makeQuery<ItemType>(queries.insertNewItem, [
    name,
    description,
    price,
    image
  ]);
  const createdItem = createdItems[0];
  await addItemCategoriesRelation(createdItem.id, categoryIds);

  return createdItem;
}
