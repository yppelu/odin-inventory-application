import { Request, Response } from 'express-serve-static-core';
import {
  addNewItem,
  getAllCategories,
  getAllItems,
  getItemData
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

export async function renderItemPage(
  req: Request,
  res: Response
): Promise<void> {
  const itemId = parseInt(req.params.id);
  const itemData = await getItemData(itemId);
  res.render('pages/item', { title: itemData.name, itemData });
}
