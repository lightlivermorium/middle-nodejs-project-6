import { createApp } from '../server/app.js';

async function runMigrations(app) {
  await app.objection.knex.migrate.latest();
}

async function runSeeders(app) {
  await app.objection.knex.seed.run();
}

async function build({ migrate = true, seed = false } = {}) {
  const app = await createApp();

  await app.ready();

  if (migrate) {
    await runMigrations(app);
  }

  if (seed) {
    await runSeeders(app);
  }

  return app;
}

export { build, runMigrations, runSeeders };
