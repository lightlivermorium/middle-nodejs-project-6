import fp from 'fastify-plugin';
import knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile.js';
import { env } from '../env/index.js';
import modelsList from '../models/index.js';

function toModelKey(modelClass) {
  return `${modelClass.name.charAt(0).toLowerCase()}${modelClass.name.slice(1)}`;
}

export default fp(
  async (fastify) => {
    const config = knexConfig[env.NODE_ENV];
    const db = knex(config);

    Model.knex(db);

    const models = Object.fromEntries(
      modelsList.map((modelClass) => [toModelKey(modelClass), modelClass]),
    );

    fastify.decorate('objection', {
      knex: db,
      Model,
      models,
    });

    fastify.addHook('onClose', async () => {
      await db.destroy();
    });
  },
  {
    name: 'objection',
  },
);
