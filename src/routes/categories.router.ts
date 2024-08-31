import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  renderAddCategoryPage,
  renderAllCategoriesPage,
  renderCategoryPage
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
  .get((req, res) => {})
  .put((req, res) => {});

export default categoriesRouter;
