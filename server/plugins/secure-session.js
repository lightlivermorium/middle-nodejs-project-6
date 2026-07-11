import fastifySecureSession from '@fastify/secure-session';
import fp from 'fastify-plugin';
import { env, isProduction } from '../env/index.js';

export default fp(
  async (fastify) => {
    await fastify.register(fastifySecureSession, {
      key: env.SESSION_KEY,
      cookie: {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: isProduction(),
      },
    });
  },
  {
    name: 'secure-session',
  },
);
