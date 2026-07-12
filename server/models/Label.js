import { snakeCaseMappers } from 'objection';
import BaseModel from './BaseModel.js';

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
}

export default Label;
