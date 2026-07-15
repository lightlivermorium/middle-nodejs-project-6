import { Model, snakeCaseMappers } from 'objection';
import BaseModel from './BaseModel.js';
import Task from './Task.js';

class Label extends BaseModel {
  static get tableName() {
    return 'labels';
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
        relation: Model.ManyToManyRelation,
        modelClass: Task,
        join: {
          from: 'labels.id',
          through: {
            from: 'task_labels.label_id',
            to: 'task_labels.task_id',
          },
          to: 'tasks.id',
        },
      },
    };
  }
}

export default Label;
