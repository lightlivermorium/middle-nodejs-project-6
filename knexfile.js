import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from './server/env/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrations = {
  directory: path.join(__dirname, 'server', 'migrations'),
};

const seeds = {
  directory: path.join(__dirname, 'server', 'seeds'),
};

export const development = {
  client: 'better-sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
  migrations,
  seeds,
};

export const test = {
  client: 'better-sqlite3',
  connection: {
    filename: ':memory:',
  },
  useNullAsDefault: true,
  migrations,
  seeds,
};

export const production = {
  client: 'pg',
  connection: env.DATABASE_URL,
  migrations,
  pool: {
    min: 2,
    max: 10,
  },
};

export default {
  development,
  test,
  production,
};
