import { Router } from 'express';
import {
  createItem,
  deleteItem,
  renderAddItemPage,
  renderAllItemsPage,
  renderItemPage,
  renderUpdateItemPage,
  updateItem
} from '../controllers/items.controller';

const itemsRouter = Router();

itemsRouter.get('/', renderAllItemsPage);

itemsRouter.route('/add-item').get(renderAddItemPage).post(createItem);

itemsRouter.get('/:id', renderItemPage);
itemsRouter.post('/:id/delete-item', deleteItem);

itemsRouter
  .route('/:id/update-item')
  .get(renderUpdateItemPage)
  .post(updateItem);

export default itemsRouter;
