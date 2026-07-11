import { t } from 'i18next';

export default async function (fastify) {
  fastify.get(
    '/labels',
    { name: 'labels.index', preValidation: fastify.authenticate },
    async (_request, reply) => {
      return reply.render('pages/labels/index.pug', {
        labels: [],
      });
    },
  );
}
