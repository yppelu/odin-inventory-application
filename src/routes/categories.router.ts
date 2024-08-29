import { Router } from 'express';
import {
  createCategory,
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

categoriesRouter
  .route('/:id')
  .get(renderCategoryPage)
  .delete((req, res) => {});

categoriesRouter
  .route('/:id/update-category')
  .get((req, res) => {})
  .put((req, res) => {});

export default categoriesRouter;
