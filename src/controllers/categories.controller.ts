import { Request, Response } from 'express-serve-static-core';
import {
  addNewCategory,
  deleteFromCategories,
  getAllCategories,
  getItemsForCategory,
  getCategoryData,
  updateCategoryData
} from '../model/db/queries';
import { addCategoryFormReturnType } from '../types';

export async function renderAllCategoriesPage(req: Request, res: Response) {
  const categories = await getAllCategories();
  res.render('pages/categories', { title: 'All Categories', categories });
}

export function renderAddCategoryPage(req: Request, res: Response) {
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

export async function deleteCategory(
  req: Request,
  res: Response
): Promise<void> {
  const categoryId = parseInt(req.params.id);
  await deleteFromCategories(categoryId);
  res.redirect('/categories');
}

export async function renderCategoryPage(
  req: Request,
  res: Response
): Promise<void> {
  const categoryId = parseInt(req.params.id);
  const items = await getItemsForCategory(categoryId);
  const categoryData = await getCategoryData(categoryId);
  res.render('pages/category', {
    title: categoryData.name,
    categoryData,
    items: items
  });
}

export async function renderUpdateCategoryPage(req: Request, res: Response) {
  const categoryId = parseInt(req.params.id);
  const categoryData = await getCategoryData(categoryId);
  res.render('pages/update-category', {
    title: 'Update Category',
    categoryData
  });
}

export async function updateCategory(
  req: Request,
  res: Response
): Promise<void> {
  const categoryId = parseInt(req.params.id);
  const [name, description, image] = [
    req.body.name,
    req.body.description,
    req.body['image-url']
  ];
  await updateCategoryData({ id: categoryId, name, description, image });
  res.redirect(`/categories/${categoryId}`);
}
