import { Router } from 'express';
import {
  renderAddItemPage,
  renderAllItemsPage
} from '../controllers/items.controller';

const itemsRouter = Router();

itemsRouter.get('/', renderAllItemsPage);

itemsRouter
  .route('/add-item')
  .get(renderAddItemPage)
  .post((req, res) => {});

itemsRouter
  .route('/:id')
  .get((req, res) => {})
  .delete((req, res) => {});

itemsRouter
  .route('/:id/update-item')
  .get((req, res) => {})
  .put((req, res) => {});

export default itemsRouter;
