import { onTestFinished } from 'vitest';
import { createApp } from '../server/app.js';

async function build() {
  const app = await createApp();

  await app.ready();

  onTestFinished(async () => {
    await app.close();
  });

  return app;
}

export { build };
