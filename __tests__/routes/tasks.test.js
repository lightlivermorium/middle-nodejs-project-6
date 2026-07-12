import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { buildTask } from '../../server/lib/data/buildTask.js';
import { build, logIn } from '../helper.js';

describe('test tasks CRUD', () => {
  let app;
  let cookie;

  beforeAll(async () => {
    app = await build();
    cookie = await logIn(app);
  });

  test('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks.index'),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks.new'),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test('create', async () => {
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks.create'),
      body: {
        data: buildTask(),
      },
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(302);
  });

  test('show not existed', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks.show', { id: 404 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(404);
  });

  test('show existed', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks.show', { id: 1 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test('edit not existed', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks.edit', { id: 404 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(404);
  });

  test('edit existed', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks.edit', { id: 1 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test('update', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('tasks.update', { id: 1 }),
      body: {
        data: buildTask(),
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
      url: app.reverse('tasks.delete', { id: 404 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(404);
  });

  test('delete existed', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('tasks.delete', { id: 1 }),
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
