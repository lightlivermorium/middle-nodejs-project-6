import path from 'node:path';
import { fileURLToPath } from 'node:url';
import autoload from '@fastify/autoload';
import i18next from 'i18next';
import qs from 'qs';
import en from './locales/en.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options = {
  exposeHeadRoutes: false,
  routerOptions: {
    querystringParser: (string) => qs.parse(string),
  },
};

export default async function (fastify, opts) {
  await i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en,
    },
  });

  fastify.register(autoload, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  fastify.register(autoload, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
}
