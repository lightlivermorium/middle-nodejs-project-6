import { expect, test } from 'vitest';
import { build } from '../helper.js';

test('home', async () => {
  const app = await build();

  const res = await app.inject({
    url: app.reverse('home'),
  });

  expect(res.statusCode).toBe(200);
  expect(res.headers['content-type']).toMatch(/^text\/html/);
});
