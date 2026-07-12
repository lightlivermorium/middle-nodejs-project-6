import { Model, snakeCaseMappers } from 'objection';
import BaseModel from './BaseModel.js';
import Label from './Label.js';
import Status from './Status.js';
import User from './User.js';

class Task extends BaseModel {
  static get tableName() {
    return 'tasks';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId', 'creatorId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: ['string', 'null'] },
        statusId: { type: 'integer' },
        creatorId: { type: 'integer' },
        executorId: { type: ['integer', 'null'] },
      },
    };
  }

  $parseJson(json, options) {
    const parsed = super.$parseJson(json, options);

    for (const field of ['statusId', 'creatorId', 'executorId']) {
      if (parsed[field] === '') {
        parsed[field] = null;
      } else if (parsed[field] !== undefined && parsed[field] !== null) {
        parsed[field] = Number(parsed[field]);
      }
    }

    return parsed;
  }

  static get relationMappings() {
    return {
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status,
        join: {
          from: 'tasks.status_id',
          to: 'statuses.id',
        },
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.creator_id',
          to: 'users.id',
        },
      },
      executor: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.executor_id',
          to: 'users.id',
        },
      },
      labels: {
        relation: Model.ManyToManyRelation,
        modelClass: Label,
        join: {
          from: 'tasks.id',
          through: {
            from: 'task_labels.task_id',
            to: 'task_labels.label_id',
          },
          to: 'labels.id',
        },
      },
    };
  }
}

export default Task;
