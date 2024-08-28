import { Router } from 'express';
import { renderAllCategories } from '../controllers/categories.controller';

const categoriesRouter = Router();

categoriesRouter.get('/', renderAllCategories);

categoriesRouter
  .route('/add-category')
  .get((req, res) => {})
  .post((req, res) => {});

categoriesRouter
  .route('/:id')
  .get((req, res) => {})
  .delete((req, res) => {});

categoriesRouter
  .route('/:id/update-category')
  .get((req, res) => {})
  .put((req, res) => {});

export default categoriesRouter;
