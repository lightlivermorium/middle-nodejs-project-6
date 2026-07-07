import fp from 'fastify-plugin';
import { plugin as fastifyReverseRoutes } from 'fastify-reverse-routes';

export default fp(async (fastify) => {
  fastify.register(fastifyReverseRoutes);
});
