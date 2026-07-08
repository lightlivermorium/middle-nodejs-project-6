import fp from 'fastify-plugin';

export default fp(
  async (fastify) => {
    fastify.addHook('preHandler', async (request) => {
      if (request.method !== 'POST') return;
      const override = request.body?._method;
      if (!override) return;
      const method = String(override).toUpperCase();
      if (!['PUT', 'PATCH', 'DELETE'].includes(method)) return;
      request.raw.method = method;
      request.method = method;
      delete request.body._method;
    });
  },

  {
    name: 'method-override',
  },
);
