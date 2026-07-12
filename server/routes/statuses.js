import { t } from 'i18next';

export default async function (fastify) {
  fastify
    .get(
      '/statuses',
      { name: 'statuses.index', preValidation: fastify.authenticate },
      async (_request, reply) => {
        const statuses = await fastify.objection.models.status.query();
        return reply.render('pages/statuses/index.pug', {
          statuses,
        });
      },
    )
    .get(
      '/statuses/new',
      { name: 'statuses.new', preValidation: fastify.authenticate },
      async (_request, reply) => {
        const status = new fastify.objection.models.status();
        return reply.render('pages/statuses/new.pug', {
          status,
          errors: {},
        });
      },
    )
    .post('/statuses', { name: 'statuses.create' }, async (request, reply) => {
      const status = new fastify.objection.models.status();
      status.$set(request.body.data);

      try {
        const validStatus = await fastify.objection.models.status.fromJson(
          request.body.data,
        );
        await fastify.objection.models.status.query().insert(validStatus);
        request.flash('info', t('statuses.create.success'));
        return reply.redirect(fastify.reverse('statuses.index'));
      } catch ({ data }) {
        request.flash('error', t('statuses.create.error'));
        return reply.render('pages/statuses/new', { status, errors: data });
      }
    })
    .get(
      '/statuses/:id/edit',
      { name: 'statuses.edit', preValidation: fastify.authenticate },
      async (request, reply) => {
        const status = await fastify.objection.models.status
          .query()
          .findById(request.params.id)
          .throwIfNotFound();
        return reply.render('pages/statuses/edit', { status, errors: {} });
      },
    )
    .patch(
      '/statuses/:id',
      { name: 'statuses.update', preValidation: fastify.authenticate },
      async (request, reply) => {
        try {
          const { id } = request.params;
          const status = await fastify.objection.models.status
            .query()
            .findById(id)
            .throwIfNotFound();

          const validated = await fastify.objection.models.status.fromJson(
            request.body.data,
            { patch: true },
          );

          await status.$query().patch(validated);
          request.flash('info', t('statuses.update.success'));
          reply.redirect(fastify.reverse('statuses.index'));
        } catch (error) {
          request.flash('error', t('statuses.update.error'));

          return reply.render('pages/statuses/edit', {
            status: { id: request.params.id, ...request.body.data },
            errors: error.data,
          });
        }
      },
    )
    .delete(
      '/statuses/:id',
      { name: 'statuses.delete', preValidation: fastify.authenticate },
      async (request, reply) => {
        await fastify.objection.models.status
          .query()
          .deleteById(request.params.id)
          .throwIfNotFound();

        request.flash('info', t('statuses.delete.success'));
        reply.redirect(fastify.reverse('statuses.index'));
      },
    );
}
