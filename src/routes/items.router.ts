import { Router } from 'express';
import {
  createItem,
  renderAddItemPage,
  renderAllItemsPage,
  renderItemPage
} from '../controllers/items.controller';

const itemsRouter = Router();

itemsRouter.get('/', renderAllItemsPage);

itemsRouter.route('/add-item').get(renderAddItemPage).post(createItem);

itemsRouter
  .route('/:id')
  .get(renderItemPage)
  .delete((req, res) => {});

itemsRouter
  .route('/:id/update-item')
  .get((req, res) => {})
  .put((req, res) => {});

export default itemsRouter;
