import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { build, getTestData } from '../helper.js';

describe('test session', () => {
  let app;
  let testData;

  beforeAll(async () => {
    app = await build();
    testData = getTestData();
  });

  test('test sign in / sign out', async () => {
    const res = await app.inject({
      method: 'GET',
      url: app.reverse('session.new'),
    });
    expect(res.statusCode).toBe(200);

    const responseSignIn = await app.inject({
      method: 'POST',
      url: app.reverse('session.create'),
      payload: {
        data: testData.users.existing,
      },
    });
    expect(responseSignIn.statusCode).toBe(302);

    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const responseSignOut = await app.inject({
      method: 'DELETE',
      url: app.reverse('session.delete'),
      cookies: cookie,
    });

    expect(responseSignOut.statusCode).toBe(302);
  });

  afterAll(async () => {
    await app.close();
  });
});
