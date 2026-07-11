import { t } from 'i18next';

export default async function (fastify) {
  fastify.get(
    '/statuses',
    { name: 'statuses.index', preValidation: fastify.authenticate },
    async (_request, reply) => {
      return reply.render('pages/statuses/index.pug', {
        statuses: [],
      });
    },
  );
}
