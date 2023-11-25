import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as migrations from '../../../../database/migrations';
const NODE_ENV = process.env.NODE_ENV;
dotenv.config({ path: `./env/${NODE_ENV}.env` });

const npm_config_argv = JSON.parse(process.env.npm_config_argv);
const commands = ['migration:revert', 'schema:drop'];

if (NODE_ENV === 'production' && commands.includes(npm_config_argv.original[1])) {
  const command = commands.find((c) => c === npm_config_argv.original[1]);
  throw new Error(`\x1b[35m \n ERROR: Do not run this command "${command}" in production environment! \x1b[0m`);
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  schema: process.env.DB_SCHEMA,
  migrations,
});

console.log(`\x1b[36m type: "${AppDataSource.options.type}" | host: "${process.env.DB_HOST}" | port: "${process.env.DB_PORT}" \x1b[0m `);
