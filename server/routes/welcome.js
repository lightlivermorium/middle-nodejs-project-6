import { t } from 'i18next';

export default async function (fastify) {
  fastify.get('/', { name: 'welcome' }, async (_request, reply) => {
    return reply.render('pages/welcome.pug', {
      title: t('views.welcome.title'),
    });
  });
}
