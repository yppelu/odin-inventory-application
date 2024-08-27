import path from 'node:path';
import express from 'express';

const PORT = process.env.PORT ?? 5000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('I am working!');
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT); // eslint-disable-line no-console
});
