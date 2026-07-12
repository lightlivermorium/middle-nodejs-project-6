import { t } from 'i18next';

export default async function (fastify) {
  fastify
    .get(
      '/tasks',
      { name: 'tasks.index', preValidation: fastify.authenticate },
      async (_request, reply) => {
        const tasks = await fastify.objection.models.task
          .query()
          .withGraphFetched('[status, creator, executor]')
          .modifyGraph('status', (builder) => {
            builder.select('id', 'name');
          })
          .modifyGraph('creator', (builder) => {
            builder.select('id', 'first_name', 'last_name');
          })
          .modifyGraph('executor', (builder) => {
            builder.select('id', 'first_name', 'last_name');
          });
        return reply.render('pages/tasks/index.pug', {
          tasks,
        });
      },
    )
    .get(
      '/tasks/new',
      { name: 'tasks.new', preValidation: fastify.authenticate },
      async (_request, reply) => {
        const task = new fastify.objection.models.task();

        const users = await fastify.objection.models.user.query();
        const statuses = await fastify.objection.models.status.query();

        return reply.render('pages/tasks/new.pug', {
          task,
          users,
          statuses,
          errors: {},
        });
      },
    )
    .post(
      '/tasks',
      { name: 'tasks.create', preValidation: fastify.authenticate },
      async (request, reply) => {
        const taskData = {
          ...request.body.data,
          creatorId: request.user.id,
        };
        const task = new fastify.objection.models.task();
        task.$set(taskData);

        const users = await fastify.objection.models.user.query();
        const statuses = await fastify.objection.models.status.query();

        try {
          const validated =
            await fastify.objection.models.task.fromJson(taskData);
          await fastify.objection.models.task.query().insert(validated);
          request.flash('info', t('tasks.create.success'));
          return reply.redirect(fastify.reverse('tasks.index'));
        } catch ({ data }) {
          request.flash('error', t('tasks.create.error'));
          return reply.render('pages/tasks/new', {
            task,
            users,
            statuses,
            errors: data,
          });
        }
      },
    )
    .get(
      '/tasks/:id',
      {
        name: 'tasks.show',
        preValidation: fastify.authenticate,
      },
      async (request, reply) => {
        const task = await fastify.objection.models.task
          .query()
          .findById(request.params.id)
          .throwIfNotFound()
          .withGraphFetched('[status, creator, executor]')
          .modifyGraph('status', (builder) => {
            builder.select('id', 'name');
          })
          .modifyGraph('creator', (builder) => {
            builder.select('id', 'first_name', 'last_name');
          })
          .modifyGraph('executor', (builder) => {
            builder.select('id', 'first_name', 'last_name');
          });

        return reply.render('pages/tasks/show.pug', {
          task,
        });
      },
    )
    .get(
      '/tasks/:id/edit',
      {
        name: 'tasks.edit',
        preValidation: fastify.authenticate,
      },
      async (request, reply) => {
        const task = await fastify.objection.models.task
          .query()
          .findById(request.params.id)
          .throwIfNotFound();

        const users = await fastify.objection.models.user.query();
        const statuses = await fastify.objection.models.status.query();

        return reply.render('pages/tasks/edit', {
          task,
          users,
          statuses,
          errors: {},
        });
      },
    )
    .patch(
      '/tasks/:id',
      { name: 'tasks.update', preValidation: fastify.authenticate },
      async (request, reply) => {
        try {
          const task = await fastify.objection.models.task
            .query()
            .findById(request.params.id)
            .throwIfNotFound();

          const validated = await fastify.objection.models.task.fromJson(
            request.body.data,
            { patch: true },
          );

          await task.$query().patch(validated);
          request.flash('info', t('tasks.update.success'));
          reply.redirect(fastify.reverse('tasks.index'));
        } catch (error) {
          request.flash('error', t('tasks.update.error'));

          const users = await fastify.objection.models.user.query();
          const statuses = await fastify.objection.models.status.query();

          return reply.render('pages/tasks/edit', {
            task: { id: request.params.id, ...request.body.data },
            users,
            statuses,
            errors: error.data,
          });
        }
      },
    )
    .delete(
      '/tasks/:id',
      {
        name: 'tasks.delete',
        preValidation: fastify.authenticate,
      },
      async (request, reply) => {
        const task = await fastify.objection.models.task
          .query()
          .findById(request.params.id)
          .throwIfNotFound();

        if (task.creatorId !== request.user.id) {
          request.flash('error', t('tasks.delete.forbidden'));
          return reply.redirect(fastify.reverse('tasks.index'));
        }

        await task.$query().delete();
        request.flash('info', t('tasks.delete.success'));
        reply.redirect(fastify.reverse('tasks.index'));
      },
    );
}
