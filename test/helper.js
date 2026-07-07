import path from 'node:path';
import { fileURLToPath } from 'node:url';
import helper from 'fastify-cli/helper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AppPath = path.join(__dirname, '..', 'server/plugin.js');

function config() {
  return {
    skipOverride: true,
  };
}

function serverConfig() {
  return {
    exposeHeadRoutes: false,
    logger: {
      level: 'error',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    },
  };
}

async function build(t) {
  // you can set all the options supported by the fastify CLI command
  const argv = [AppPath];

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  const app = await helper.build(argv, config(), serverConfig());

  // tear down our app after we are done
  t.after(() => app.close());

  return app;
}

export { build, config };
