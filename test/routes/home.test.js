import * as assert from 'node:assert';
import { test } from 'node:test';
import { build } from '../helper.js';

test('home', async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: '/',
  });

  assert.equal(res.statusCode, 200);
  assert.match(res.headers['content-type'], /^text\/html/);
});
