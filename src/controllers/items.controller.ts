import { Request, Response } from 'express-serve-static-core';
import { getAllItems } from '../model/db/queries';

export async function renderAllItemsPage(req: Request, res: Response) {
  const items = await getAllItems();
  res.render('pages/items', { title: 'All Items', items });
}
