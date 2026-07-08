import fastifySecureSession from '@fastify/secure-session';
import fp from 'fastify-plugin';
import { env } from '../env/index.js';

export default fp(
  async (fastify) => {
    await fastify.register(fastifySecureSession, {
      key: env.SESSION_KEY,
      cookie: {
        path: '/',
      },
    });
  },
  {
    name: 'secure-session',
  },
);
