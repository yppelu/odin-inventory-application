import { Request, Response } from 'express-serve-static-core';
import { getAllCategories, addNewCategory } from '../model/db/queries';
import { addCategoryFormReturnType } from '../types';

export async function renderAllCategoriesPage(req: Request, res: Response) {
  const categories = await getAllCategories();
  res.render('pages/categories', { title: 'All Categories', categories });
}

export async function renderAddCategoryPage(req: Request, res: Response) {
  res.render('pages/add-category', { title: 'Add Category' });
}

export async function createCategory(
  req: Request,
  res: Response
): Promise<void> {
  const params: addCategoryFormReturnType = req.body;
  const createdCategory = await addNewCategory(params);
  res.redirect(`/categories/${createdCategory.id}`);
}
