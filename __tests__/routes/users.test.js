import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { buildUser } from '../../server/seeds/helpers/buildUser.js';
import { build } from '../helper.js';

describe('test users CRUD', () => {
  let app;

  beforeAll(async () => {
    app = await build();
  });

  test('index', async () => {
    const res = await app.inject({
      method: 'GET',
      url: app.reverse('users.index'),
    });
    expect(res.statusCode).toBe(200);
  });

  test('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users.new'),
    });

    expect(response.statusCode).toBe(200);
  });

  test('create', async () => {
    const user = buildUser();
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users.create'),
      body: {
        data: user,
      },
    });

    expect(response.statusCode).toBe(302);

    const storedUser = await app.objection.models.user
      .query()
      .findOne({ email: user.email });

    expect(storedUser.firstName).toBe(user.firstName);
    expect(storedUser.lastName).toBe(user.lastName);
    expect(storedUser.email).toBe(user.email);
  });

  afterAll(async () => {
    await app.close();
  });
});
