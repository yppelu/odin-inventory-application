import { Request, Response } from 'express-serve-static-core';
import { queryAllItems } from '../model/db/queries';

export async function renderAllItems(req: Request, res: Response) {
  const items = await queryAllItems();
  res.render('pages/items', { title: 'All Items', items });
}
