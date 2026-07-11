import { t } from 'i18next';

export default async function (fastify) {
  fastify
    .get('/session/new', { name: 'session.new' }, async (_request, reply) => {
      return reply.render('pages/session/new.pug', {
        signInForm: {},
        errors: {},
      });
    })
    .post(
      '/session',
      { name: 'session.create' },
      fastify.fp.authenticate('form', async (request, reply, err, user) => {
        if (err) {
          return fastify.httpErrors.internalServerError(err);
        }
        if (!user) {
          const signInForm = request.body.data;
          const errors = {
            email: [{ message: t('session.create.error') }],
          };
          return reply.render('pages/session/new', { signInForm, errors });
        }
        await request.logIn(user);
        request.flash('success', t('session.create.success'));
        reply.redirect(fastify.reverse('welcome'));
      }),
    )
    .delete('/session', { name: 'session.delete' }, (request, reply) => {
      request.logOut();
      request.flash('info', t('session.delete.success'));
      reply.redirect(fastify.reverse('welcome'));
    });
}
