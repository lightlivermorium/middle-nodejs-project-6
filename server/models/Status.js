import { Model, snakeCaseMappers } from 'objection';
import objectionUnique from 'objection-unique';
import BaseModel from './BaseModel.js';
import Task from './Task.js';

const unique = objectionUnique({ fields: ['name'] });

class Status extends unique(BaseModel) {
  static get tableName() {
    return 'statuses';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
      },
    };
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'statuses.id',
          to: 'tasks.status_id',
        },
      },
    };
  }
}

export default Status;
