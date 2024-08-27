import { Client } from 'pg';

const query: string = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS category_item_relations (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INTEGER REFERENCES categories (id) ON UPDATE CASCADE ON DELETE CASCADE,
    item_id INTEGER REFERENCES items (id) ON UPDATE CASCADE ON DELETE CASCADE
  );
`;

function main(): void {
  console.log('Seeding...'); // eslint-disable-line no-console

  const client = new Client({
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT as string),
    user: process.env.PG_USER
  });

  client.connect(() => {
    client.query(query, () => {
      console.log('Done'); // eslint-disable-line no-console
      client.end();
    });
  });
}

main();
