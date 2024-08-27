import path from 'node:path';
import express from 'express';

import indexRouter from './routes/index.router';
import categoriesRouter from './routes/categories.router';
import itemsRouter from './routes/items.router';

const PORT = process.env.PORT ?? 5000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT); // eslint-disable-line no-console
});
