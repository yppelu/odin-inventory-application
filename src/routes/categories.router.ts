import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  renderAddCategoryPage,
  renderAllCategoriesPage,
  renderCategoryPage,
  renderUpdateCategoryPage,
  updateCategory
} from '../controllers/categories.controller';

const categoriesRouter = Router();

categoriesRouter.get('/', renderAllCategoriesPage);

categoriesRouter
  .route('/add-category')
  .get(renderAddCategoryPage)
  .post(createCategory);

categoriesRouter.get('/:id', renderCategoryPage);
categoriesRouter.post('/:id/delete-category', deleteCategory);

categoriesRouter
  .route('/:id/update-category')
  .get(renderUpdateCategoryPage)
  .post(updateCategory);

export default categoriesRouter;
