import { Request, Response } from 'express-serve-static-core';
import { getAllCategories } from '../model/db/queries';

export async function renderAllCategoriesPage(req: Request, res: Response) {
  const categories = await getAllCategories();
  res.render('pages/categories', { title: 'All Categories', categories });
}

export async function renderAddCategoryPage(req: Request, res: Response) {
  res.render('pages/add-category', { title: 'Add Category' });
}
