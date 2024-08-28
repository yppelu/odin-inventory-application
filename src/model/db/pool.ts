import { Pool } from 'pg';

export default new Pool({
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT as string),
  user: process.env.PG_USER
});
