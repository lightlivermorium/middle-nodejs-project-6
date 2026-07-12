import { t } from 'i18next';

const normalizeLabels = (labels) =>
  (Array.isArray(labels) ? labels : [labels])
    .filter((id) => id !== undefined && id !== null && id !== '')
    .map(Number);

const extractTaskData = (data) => {
  const { labels, ...taskData } = data;
  return {
    taskData,
    labels: normalizeLabels(labels),
  };
};

const relateLabels = async (task, labels) => {
  for (const labelId of labels) {
    await task.$relatedQuery('labels').relate(labelId);
  }
};

export default async function (fastify) {
  fastify
    .get(
      '/tasks',
      { name: 'tasks.index', preValidation: fastify.authenticate },
      async (_request, reply) => {
        const tasks = await fastify.objection.models.task
          .query()
          .withGraphFetched('[status, creator, executor, labels]')
          .modifyGraph('status', (builder) => {
            builder.select('id', 'name');
          })
          .modifyGraph('creator', (builder) => {
            builder.select('id', 'first_name', 'last_name');
          })
          .modifyGraph('executor', (builder) => {
            builder.select('id', 'first_name', 'last_name');
          })
          .modifyGraph('labels', (builder) => {
            builder.select('id', 'name');
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
        const labels = await fastify.objection.models.label.query();

        return reply.render('pages/tasks/new.pug', {
          task,
          users,
          statuses,
          labels,
          errors: {},
        });
      },
    )
    .post(
      '/tasks',
      { name: 'tasks.create', preValidation: fastify.authenticate },
      async (request, reply) => {
        const { taskData: formTaskData, labels: selectedLabels } =
          extractTaskData(request.body.data);
        const taskData = {
          ...formTaskData,
          creatorId: request.user.id,
        };
        const task = new fastify.objection.models.task();
        task.$set(taskData);
        task.labels = selectedLabels;

        const users = await fastify.objection.models.user.query();
        const statuses = await fastify.objection.models.status.query();
        const labels = await fastify.objection.models.label.query();

        try {
          const validated =
            await fastify.objection.models.task.fromJson(taskData);
          const createdTask = await fastify.objection.models.task
            .query()
            .insert(validated);
          await relateLabels(createdTask, selectedLabels);
          request.flash('info', t('tasks.create.success'));
          return reply.redirect(fastify.reverse('tasks.index'));
        } catch ({ data }) {
          request.flash('error', t('tasks.create.error'));
          return reply.render('pages/tasks/new', {
            task,
            users,
            statuses,
            labels,
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
          .withGraphFetched('[status, creator, executor, labels]')
          .modifyGraph('status', (builder) => {
            builder.select('id', 'name');
          })
          .modifyGraph('creator', (builder) => {
            builder.select('id', 'first_name', 'last_name');
          })
          .modifyGraph('executor', (builder) => {
            builder.select('id', 'first_name', 'last_name');
          })
          .modifyGraph('labels', (builder) => {
            builder.select('id', 'name');
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
          .throwIfNotFound()
          .withGraphFetched('labels');
        task.labels = task.labels.map((label) => label.id);

        const users = await fastify.objection.models.user.query();
        const statuses = await fastify.objection.models.status.query();
        const labels = await fastify.objection.models.label.query();

        return reply.render('pages/tasks/edit', {
          task,
          users,
          statuses,
          labels,
          errors: {},
        });
      },
    )
    .patch(
      '/tasks/:id',
      { name: 'tasks.update', preValidation: fastify.authenticate },
      async (request, reply) => {
        try {
          const { taskData, labels: selectedLabels } = extractTaskData(
            request.body.data,
          );
          const task = await fastify.objection.models.task
            .query()
            .findById(request.params.id)
            .throwIfNotFound();

          const validated = await fastify.objection.models.task.fromJson(
            taskData,
            { patch: true },
          );

          await task.$query().patch(validated);
          await task.$relatedQuery('labels').unrelate();
          await relateLabels(task, selectedLabels);
          request.flash('info', t('tasks.update.success'));
          reply.redirect(fastify.reverse('tasks.index'));
        } catch (error) {
          request.flash('error', t('tasks.update.error'));

          const users = await fastify.objection.models.user.query();
          const statuses = await fastify.objection.models.status.query();
          const labels = await fastify.objection.models.label.query();

          return reply.render('pages/tasks/edit', {
            task: { id: request.params.id, ...request.body.data },
            users,
            statuses,
            labels,
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
