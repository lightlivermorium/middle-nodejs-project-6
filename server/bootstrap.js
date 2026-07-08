import process from 'node:process';
import { createApp } from './app.js';
import { env } from './env/index.js';

async function bootstrap() {
  const app = await createApp();

  await app.ready();

  await app.listen({
    port: env.PORT,
    host: env.HOST,
  });

  const signals = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.on(signal, async () => {
      await app.close();
    });
  }
}

bootstrap();
