import { Router } from 'express';
import { renderAllItems } from '../controllers/items.controller';

const itemsRouter = Router();

itemsRouter.get('/', renderAllItems);

itemsRouter
  .route('/add-item')
  .get((req, res) => {})
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
