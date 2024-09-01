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
  selectCategoryData: 'SELECT * FROM categories WHERE id = $1;',
  selectItemData: 'SELECT * FROM items WHERE id = $1;',
  selectITemsForCategory: `
    SELECT items.id, items.name, items.description, items.price, items.image
    FROM items
    JOIN category_item_relations ON items.id = category_item_relations.item_id
    WHERE category_item_relations.category_id = $1;`,
  insertNewCategory:
    'INSERT INTO categories (name, description, image) VALUES ($1, $2, $3) RETURNING *;',
  insertNewItem:
    'INSERT INTO items (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *;',
  insertCategoryItemRelation:
    'INSERT INTO category_item_relations (category_id, item_id) VALUES ($1, $2);',
  deleteFromCategories: 'DELETE FROM categories WHERE id = $1;',
  deleteFromItems: 'DELETE FROM items WHERE id = $1;',
  updateCategory: `
    UPDATE categories
    SET
      name = $2,
      description = $3,
      image = $4
    WHERE id = $1;`,
  selectCategoriesItemIn: `
    SELECT categories.id FROM categories
    JOIN category_item_relations ON categories.id = category_item_relations.category_id
    WHERE category_item_relations.item_id = $1;`,
  updateItem: `
    UPDATE items
    SET
      name = $2,
      description = $3,
      price = $4,
      image = $5
    WHERE id = $1;`,
  deleteItemCategoriesRelations:
    'DELETE FROM category_item_relations WHERE item_id = $1;'
};

async function makeQuery<T>(
  query: string,
  params?: (string | number | undefined)[]
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

export async function getCategoryData(
  categoryId: number
): Promise<CategoryType> {
  const categoriesData = await makeQuery<CategoryType>(
    queries.selectCategoryData,
    [categoryId]
  );
  return categoriesData[0];
}

export async function getItemData(itemId: number): Promise<ItemType> {
  const itemsData = await makeQuery<ItemType>(queries.selectItemData, [itemId]);
  return itemsData[0];
}

export async function getItemsForCategory(
  categoryId: number
): Promise<ItemType[]> {
  return await makeQuery<ItemType>(queries.selectITemsForCategory, [
    categoryId
  ]);
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

export async function deleteItemCategoriesRelations(itemId: number) {
  await makeQuery(queries.deleteItemCategoriesRelations, [itemId]);
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

export async function deleteFromCategories(categoryId: number): Promise<void> {
  await makeQuery<CategoryType>(queries.deleteFromCategories, [categoryId]);
}

export async function deleteFromItems(itemId: number): Promise<void> {
  await makeQuery<CategoryType>(queries.deleteFromItems, [itemId]);
}

export async function updateCategoryData({
  id,
  name,
  description,
  image
}: CategoryType) {
  await makeQuery<CategoryType>(queries.updateCategory, [
    id,
    name,
    description,
    image
  ]);
}

export async function getCategoryIdsItemIn(itemId: number): Promise<number[]> {
  const categoriesItemIn = await makeQuery<CategoryType>(
    queries.selectCategoriesItemIn,
    [itemId]
  );
  return categoriesItemIn.map((category) => category.id);
}

export async function updateItemData(
  itemId: number,
  { name, description, price, categoryIds, image }: addItemFormReturnType
): Promise<void> {
  await makeQuery<ItemType>(queries.updateItem, [
    itemId,
    name,
    description,
    price,
    image
  ]);
  await deleteItemCategoriesRelations(itemId);
  await addItemCategoriesRelation(itemId, categoryIds);
}
