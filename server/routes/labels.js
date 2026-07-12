import { t } from 'i18next';

export default async function (fastify) {
  fastify
    .get(
      '/labels',
      { name: 'labels.index', preValidation: fastify.authenticate },
      async (_request, reply) => {
        const labels = await fastify.objection.models.label.query();
        return reply.render('pages/labels/index.pug', {
          labels,
        });
      },
    )
    .get(
      '/labels/new',
      { name: 'labels.new', preValidation: fastify.authenticate },
      async (_request, reply) => {
        const label = new fastify.objection.models.label();
        return reply.render('pages/labels/new.pug', {
          label,
          errors: {},
        });
      },
    )
    .post(
      '/labels',
      { name: 'labels.create', preValidation: fastify.authenticate },
      async (request, reply) => {
        const label = new fastify.objection.models.label();
        label.$set(request.body.data);

        try {
          const validated = await fastify.objection.models.label.fromJson(
            request.body.data,
          );
          await fastify.objection.models.label.query().insert(validated);
          request.flash('info', t('labels.create.success'));
          return reply.redirect(fastify.reverse('labels.index'));
        } catch ({ data }) {
          request.flash('error', t('labels.create.error'));
          return reply.render('pages/labels/new', {
            label,
            errors: data,
          });
        }
      },
    )
    .get(
      '/labels/:id/edit',
      { name: 'labels.edit', preValidation: fastify.authenticate },
      async (request, reply) => {
        const label = await fastify.objection.models.label
          .query()
          .findById(request.params.id)
          .throwIfNotFound();

        return reply.render('pages/labels/edit.pug', {
          label,
          errors: {},
        });
      },
    )
    .patch(
      '/labels/:id',
      { name: 'labels.update', preValidation: fastify.authenticate },
      async (request, reply) => {
        try {
          const label = await fastify.objection.models.label
            .query()
            .findById(request.params.id)
            .throwIfNotFound();

          const validated = await fastify.objection.models.label.fromJson(
            request.body.data,
            { patch: true },
          );

          await label.$query().patch(validated);
          request.flash('info', t('labels.update.success'));
          return reply.redirect(fastify.reverse('labels.index'));
        } catch (error) {
          request.flash('error', t('labels.update.error'));

          return reply.render('pages/labels/edit', {
            label: { id: request.params.id, ...request.body.data },
            errors: error.data,
          });
        }
      },
    )
    .delete(
      '/labels/:id',
      { name: 'labels.delete', preValidation: fastify.authenticate },
      async (request, reply) => {
        const label = await fastify.objection.models.label
          .query()
          .findById(request.params.id)
          .throwIfNotFound();

        const hasTaskWithTheLabel = await fastify.objection
          .knex('task_labels')
          .where('label_id', label.id)
          .first();

        if (hasTaskWithTheLabel) {
          request.flash('error', t('labels.delete.error'));
          return reply.redirect(fastify.reverse('labels.index'));
        }

        await label.$query().delete();
        request.flash('info', t('labels.delete.success'));
        return reply.redirect(fastify.reverse('labels.index'));
      },
    );
}
