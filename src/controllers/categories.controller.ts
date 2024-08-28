import { Request, Response } from 'express-serve-static-core';
import { queryAllCategories } from '../model/db/queries';

export async function renderAllCategoriesPage(req: Request, res: Response) {
  const categories = await queryAllCategories();
  res.render('pages/categories', { title: 'All Categories', categories });
}

export async function renderAddCategoryPage(req: Request, res: Response) {
  res.render('pages/add-category', { title: 'Add Category' });
}
