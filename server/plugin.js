import path from 'node:path';
import { fileURLToPath } from 'node:url';
import autoload from '@fastify/autoload';
import i18next from 'i18next';
import en from './locales/en.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options = {
  exposeHeadRoutes: false,
};

export default async function (app, _options) {
  await i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en,
    },
  });

  app.addHook('preHandler', async (request, reply) => {
    reply.locals = {
      isAuthenticated: () => request.isAuthenticated(),
    };
  });

  await app.register(autoload, {
    dir: path.join(__dirname, 'plugins'),
  });

  await app.register(autoload, {
    dir: path.join(__dirname, 'routes'),
  });

  return app;
}
