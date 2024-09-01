import { Request, Response } from 'express-serve-static-core';
import {
  addNewItem,
  deleteFromItems,
  getAllCategories,
  getAllItems,
  getItemData,
  getCategoryIdsItemIn,
  updateItemData
} from '../model/db/queries';
import { addItemFormReturnType } from '../types';

export async function renderAllItemsPage(req: Request, res: Response) {
  const items = await getAllItems();
  res.render('pages/items', { title: 'All Items', items });
}

export async function renderAddItemPage(req: Request, res: Response) {
  const categories = await getAllCategories();
  res.render('pages/add-item', { title: 'Add Item', categories });
}

export async function createItem(req: Request, res: Response): Promise<void> {
  const chosenCategories: number[] = [];
  for (const key in req.body) {
    if (key.match(/check-\d/)) {
      const categoryIdFromKey = parseInt(key.replace('check-', ''));
      chosenCategories.push(categoryIdFromKey);
    }
  }

  const params: addItemFormReturnType = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    categoryIds: chosenCategories,
    image: req.body['image-url']
  };
  const createdItem = await addNewItem(params);

  res.redirect(`/items/${createdItem.id}`);
}

export async function deleteItem(req: Request, res: Response) {
  const itemId = parseInt(req.params.id);

  if (req.body['delete-password'] !== process.env.PG_PASSWORD) {
    res.redirect(`/items/${itemId}?wrongPassword=true`);
  } else {
    await deleteFromItems(itemId);
    res.redirect('/items');
  }
}

export async function renderItemPage(
  req: Request,
  res: Response
): Promise<void> {
  const itemId = parseInt(req.params.id);
  const itemData = await getItemData(itemId);
  res.render('pages/item', {
    title: itemData.name,
    itemData,
    wrongPassword: req.query.wrongPassword
  });
}

export async function renderUpdateItemPage(
  req: Request,
  res: Response
): Promise<void> {
  const itemId = parseInt(req.params.id);
  const categories = await getAllCategories();
  const itemData = await getItemData(itemId);
  const categoryIdsItemIn = await getCategoryIdsItemIn(itemId);
  res.render('pages/update-item', {
    title: 'Update Item',
    itemData,
    categories,
    categoryIdsItemIn
  });
}

export async function updateItem(req: Request, res: Response) {
  const chosenCategories: number[] = [];
  for (const key in req.body) {
    if (key.match(/check-\d/)) {
      const categoryIdFromKey = parseInt(key.replace('check-', ''));
      chosenCategories.push(categoryIdFromKey);
    }
  }

  const params: addItemFormReturnType = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    categoryIds: chosenCategories,
    image: req.body['image-url']
  };
  const itemId = parseInt(req.params.id);
  await updateItemData(itemId, params);

  res.redirect(`/items/${itemId}`);
}
