import fp from 'fastify-plugin';
import Rollbar from 'rollbar';
import { env, isProduction } from '../env/index.js';

async function fastifyRollbar(fastify) {
  const rollbar = new Rollbar({
    accessToken: env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: env.ROLLBAR_ENVIRONMENT,
    enabled: isProduction(),
  });

  fastify.decorate('rollbar', rollbar);

  fastify.addHook('onError', async (request, reply, error) => {
    fastify.rollbar.error(error, request.raw);
  });
}

export default fp(fastifyRollbar, { name: 'rollbar' });
