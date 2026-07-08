import fastifyFormbody from '@fastify/formbody';
import fp from 'fastify-plugin';
import qs from 'qs';

export default fp(
  async (fastify) => {
    await fastify.register(fastifyFormbody, { parser: qs.parse });
  },
  {
    name: 'form-body',
  },
);
