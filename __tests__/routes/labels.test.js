import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { buildLabel } from '../../server/lib/data/buildLabel.js';
import { build, logIn } from '../helper.js';

describe('test labels CRUD', () => {
  let app;
  let cookie;

  beforeAll(async () => {
    app = await build();
    cookie = await logIn(app);
  });

  test('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('labels.index'),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('labels.new'),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test('create', async () => {
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('labels.create'),
      body: {
        data: buildLabel(),
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
      url: app.reverse('labels.edit', { id: 404 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(404);
  });

  test('edit existed', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('labels.edit', { id: 1 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test('update', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('labels.update', { id: 1 }),
      body: {
        data: buildLabel(),
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
      url: app.reverse('labels.delete', { id: 404 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(404);
  });

  test('delete related label', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('labels.delete', { id: 1 }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(302);

    const label = await app.objection.models.label.query().findById(1);
    expect(label).toBeDefined();
  });

  test('delete existed', async () => {
    const label = await app.objection.models.label.query().insert(buildLabel());

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('labels.delete', { id: label.id }),
      headers: {
        cookie,
      },
    });

    expect(response.statusCode).toBe(302);

    const deletedLabel = await app.objection.models.label
      .query()
      .findById(label.id);
    expect(deletedLabel).toBeUndefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
