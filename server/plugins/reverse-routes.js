import fp from 'fastify-plugin';
import { plugin as fastifyReverseRoutes } from 'fastify-reverse-routes';

export default fp(
  async (fastify) => {
    await fastify.register(fastifyReverseRoutes);
  },
  {
    name: 'reverse-routes',
  },
);
