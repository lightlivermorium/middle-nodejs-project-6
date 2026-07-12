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

  test('filter by status', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${app.reverse('tasks.index')}?status=2`,
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('Review task UI');
    expect(response.body).not.toContain('Write project tests');
  });

  test('filter by executor', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${app.reverse('tasks.index')}?executor=2`,
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('Write project tests');
    expect(response.body).not.toContain('Review task UI');
  });

  test('filter by label', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${app.reverse('tasks.index')}?label=3`,
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('Review task UI');
    expect(response.body).not.toContain('Write project tests');
  });

  test('filter by creator', async () => {
    await app.objection.models.task.query().insert({
      name: 'Other creator task',
      description: 'Task created by another user',
      statusId: 1,
      creatorId: 2,
      executorId: 1,
    });

    const response = await app.inject({
      method: 'GET',
      url: `${app.reverse('tasks.index')}?isCreatorUser=1`,
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('Write project tests');
    expect(response.body).toContain('Review task UI');
    expect(response.body).not.toContain('Other creator task');
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
