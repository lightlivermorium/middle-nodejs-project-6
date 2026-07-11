import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import view from '@fastify/view';
import fp from 'fastify-plugin';
import i18next from 'i18next';
import _ from 'lodash';
import pug from 'pug';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default fp(
  async (fastify) => {
    const manifestPath = path.join(__dirname, '../../dist/.vite/manifest.json');
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

    await fastify.register(view, {
      engine: { pug },
      root: path.join(__dirname, '../views'),
      includeViewExtension: true,
      defaultContext: {
        assets: (filename) => `/${manifest[filename]?.file ?? ''}`,
        route: (name, placeholdersValues, options) =>
          fastify.reverse(name, placeholdersValues, options),
        t: (key, options) => i18next.t(key, options),
        has: _.has,
        get: _.get,
      },
    });
    fastify.decorateReply('render', function (template, args = {}) {
      return this.view(template, {
        ...args,
        flash: this.flash(),
      });
    });
  },

  {
    name: 'view',
  },
);
