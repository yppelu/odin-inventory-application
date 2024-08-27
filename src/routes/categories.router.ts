import { Router } from 'express';

const categoriesRouter = Router();

categoriesRouter.get('/', (req, res) => {});

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
