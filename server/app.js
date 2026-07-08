import path from 'node:path';
import { fileURLToPath } from 'node:url';
import autoload from '@fastify/autoload';
import fastify from 'fastify';
import i18next from 'i18next';
import pino from 'pino';
import qs from 'qs';
import { env } from './env/index.js';
import en from './locales/en.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createApp() {
  const app = fastify({
    loggerInstance: pino({
      level: env.LOG_LEVEL,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    }),
    exposeHeadRoutes: false,
    routerOptions: {
      querystringParser: (string) => qs.parse(string),
    },
  });

  await i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en,
    },
  });

  await app.register(autoload, {
    dir: path.join(__dirname, 'plugins'),
  });

  await app.register(autoload, {
    dir: path.join(__dirname, 'routes'),
  });

  return app;
}
