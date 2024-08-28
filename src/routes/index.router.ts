import { Router } from 'express';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.render('pages/index', { title: 'Inventory Application' });
});

export default indexRouter;
