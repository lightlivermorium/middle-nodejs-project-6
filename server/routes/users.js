import { t } from 'i18next';

export default async function (fastify) {
  fastify
    .get('/users', { name: 'users.index' }, async (_request, reply) => {
      const users = await fastify.objection.models.user.query();
      return reply.render('pages/users/index.pug', {
        users,
      });
    })
    .get('/users/new', { name: 'users.new' }, async (_request, reply) => {
      const user = new fastify.objection.models.user();
      return reply.render('pages/users/new.pug', {
        user,
        errors: {},
      });
    })
    .post('/users', { name: 'users.create' }, async (request, reply) => {
      const user = new fastify.objection.models.user();
      user.$set(request.body.data);

      try {
        const validated = await fastify.objection.models.user.fromJson(
          request.body.data,
        );
        await fastify.objection.models.user.query().insert(validated);
        request.flash('info', t('users.create.success'));
        return reply.redirect(fastify.reverse('welcome'));
      } catch ({ data }) {
        request.flash('error', t('users.create.error'));
        return reply.render('pages/users/new', { user, errors: data });
      }
    })
    .get(
      '/users/:id/edit',
      { name: 'users.edit', preValidation: fastify.authenticate },
      async (request, reply) => {
        const id = Number(request.params.id);
        if (id !== request.user.id) {
          request.flash('error', t('users.manage.forbidden'));
          return reply.redirect(fastify.reverse('users.index'));
        }

        const user = await fastify.objection.models.user.query().findById(id);
        return reply.render('pages/users/edit', { user, errors: {} });
      },
    )
    .patch(
      '/users/:id',
      { name: 'users.update', preValidation: fastify.authenticate },
      async (request, reply) => {
        try {
          const { id } = request.params;
          const user = await fastify.objection.models.user
            .query()
            .findById(id)
            .throwIfNotFound();

          if (!request.body.data.password) {
            delete request.body.data.password;
          }

          const validated = await fastify.objection.models.user.fromJson(
            request.body.data,
            { patch: true },
          );

          await user.$query().patch(validated);
          request.flash('info', t('users.update.success'));
          reply.redirect(fastify.reverse('users.index'));
        } catch (error) {
          request.flash('error', t('users.update.error'));

          return reply.render('pages/users/edit', {
            user: { id: request.params.id, ...request.body.data },
            errors: error.data,
          });
        }
      },
    )
    .delete(
      '/users/:id',
      { name: 'users.delete', preValidation: fastify.authenticate },
      async (request, reply) => {
        try {
          const id = Number(request.params.id);
          const hasAssignedTasks = await fastify.objection.models.task
            .query()
            .where('executor_id', id)
            .resultSize();

          if (id !== request.user.id || hasAssignedTasks) {
            request.flash('error', t('users.manage.forbidden'));
            return reply.redirect(fastify.reverse('users.index'));
          }

          await fastify.objection.models.user.query().deleteById(id);
          request.logOut();
          request.flash('info', t('users.delete.success'));
        } catch (error) {
          request.flash('error', t('users.delete.error'));
        } finally {
          reply.redirect(fastify.reverse('users.index'));
        }
      },
    );
}
