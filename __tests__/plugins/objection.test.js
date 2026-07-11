import { expect, test } from 'vitest';
import { build } from '../helper.js';

test('decorates app with objection integration', async () => {
  const app = await build();

  expect(app.objection).toBeDefined();
  expect(app.objection.knex).toBeDefined();
  expect(app.objection.Model).toBeDefined();
  expect(app.objection.models.user).toBeDefined();
});

test('allows querying user model through app.objection', async () => {
  const app = await build({ seed: true });

  const users = await app.objection.models.user.query();

  expect(Array.isArray(users)).toBe(true);
  expect(users.length).toBeGreaterThan(0);
});
