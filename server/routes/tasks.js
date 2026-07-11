import { t } from 'i18next';

export default async function (fastify) {
  fastify.get(
    '/tasks',
    { name: 'tasks.index', preValidation: fastify.authenticate },
    async (_request, reply) => {
      return reply.render('pages/tasks/index.pug', {
        tasks: [],
      });
    },
  );
}
