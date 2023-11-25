import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV;

dotenv.config({ path: `./env/${NODE_ENV}.env` });

export const connection = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: 'public',
});
