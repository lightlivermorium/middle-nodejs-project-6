import fs from 'node:fs';
import path from 'node:path';
import { URL } from 'node:url';
import fastify from 'fastify';
import fixtures from 'simple-knex-fixtures';
import init from '../server/plugin.js';

export async function build() {
  const app = fastify({
    exposeHeadRoutes: false,
    logger: { target: 'pino-pretty' },
  });
  await init(app);

  await app.ready();

  const { knex } = app.objection;

  await knex.migrate.latest();
  await fixtures.loadFiles(
    [
      '__fixtures__/users.knex.json',
      '__fixtures__/statuses.knex.json',
      '__fixtures__/labels.knex.json',
      '__fixtures__/tasks.knex.json',
      '__fixtures__/task_labels.knex.json',
    ],
    knex,
  );

  return app;
}

function extractCookieHeader(response) {
  const cookies = response.headers['set-cookie'];

  if (Array.isArray(cookies)) {
    return cookies.map((cookie) => cookie.split(';')[0]).join('; ');
  }

  return cookies?.split(';')[0] ?? '';
}

export async function logIn(app, user = getTestData().users.existing) {
  const response = await app.inject({
    method: 'POST',
    url: app.reverse('session.create'),
    payload: {
      data: {
        email: user.email,
        password: user.password,
      },
    },
  });

  return extractCookieHeader(response);
}

const getFixturePath = (filename) => path.join('..', '__fixtures__', filename);
const readFixture = (filename) =>
  fs
    .readFileSync(new URL(getFixturePath(filename), import.meta.url), 'utf-8')
    .trim();
const getFixtureData = (filename) => JSON.parse(readFixture(filename));

export const getTestData = () => getFixtureData('testData.json');
