import { Router } from 'express';
import {
  createItem,
  deleteItem,
  renderAddItemPage,
  renderAllItemsPage,
  renderItemPage
} from '../controllers/items.controller';

const itemsRouter = Router();

itemsRouter.get('/', renderAllItemsPage);

itemsRouter.route('/add-item').get(renderAddItemPage).post(createItem);

itemsRouter.get('/:id', renderItemPage);
itemsRouter.post('/:id/delete-item', deleteItem);

itemsRouter
  .route('/:id/update-item')
  .get((req, res) => {})
  .put((req, res) => {});

export default itemsRouter;
