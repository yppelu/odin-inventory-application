import { Router } from 'express';

const itemsRouter = Router();

itemsRouter.get('/', (req, res) => {});

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
