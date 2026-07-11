import { snakeCaseMappers } from 'objection';
import objectionUnique from 'objection-unique';
import { encrypt } from '../lib/secure.js';
import BaseModel from './BaseModel.js';

const unique = objectionUnique({ fields: ['email'] });

class User extends unique(BaseModel) {
  static get tableName() {
    return 'users';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'firstName', 'lastName', 'password'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1 },
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }

  verifyPassword(password) {
    return encrypt(password) === this.passwordDigest;
  }
}

export default User;
