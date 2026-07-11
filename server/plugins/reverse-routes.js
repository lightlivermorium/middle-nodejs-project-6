import fp from 'fastify-plugin';
import reverseRoutes, {
  plugin as fastifyReverseRoutes,
} from 'fastify-reverse-routes';

export default fp(
  async (fastify) => {
    reverseRoutes.routes.clear();

    await fastify.register(fastifyReverseRoutes);

    fastify.addHook('onClose', async () => {
      reverseRoutes.routes.clear();
    });
  },
  {
    name: 'reverse-routes',
  },
);
