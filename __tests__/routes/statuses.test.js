import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { buildStatus } from '../data/buildStatus.js';
import { build, logIn } from '../helper.js';

describe('test statuses CRUD', () => {
  let app;
  let cookie;

  beforeAll(async () => {
    app = await build();
    cookie = await logIn(app);
  });

  test('index', async () => {
    const res = await app.inject({
      method: 'GET',
      url: app.reverse('statuses.index'),
      headers: {
        cookie,
      },
    });
    expect(res.statusCode).toBe(200);
  });

  test('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses.new'),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test('create', async () => {
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('statuses.create'),
      body: {
        data: buildStatus(),
      },
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(302);
  });

  test('edit not existed', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses.edit', { id: 404 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(404);
  });

  test('edit existed', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses.edit', { id: 1 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test('update', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('statuses.update', { id: 1 }),
      body: {
        data: buildStatus(),
      },
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(302);
  });

  test('delete not existed', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('statuses.update', { id: 404 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(404);
  });

  test('delete existed', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('statuses.update', { id: 1 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(302);
  });

  afterAll(async () => {
    await app.close();
  });
});
