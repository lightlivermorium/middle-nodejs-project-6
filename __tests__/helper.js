import fs from 'node:fs';
import path from 'node:path';
import { URL } from 'node:url';
import fixtures from 'simple-knex-fixtures';
import { createApp } from '../server/app.js';

export async function build() {
  const app = await createApp();

  await app.ready();

  const { knex } = app.objection;

  await knex.migrate.latest();
  await fixtures.loadFiles('__fixtures__/*.knex.json', knex);

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
