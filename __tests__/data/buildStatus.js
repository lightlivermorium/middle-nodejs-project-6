import { faker } from '@faker-js/faker';

export function buildStatus(overrides = {}) {
  return {
    name: faker.lorem.word(),
    ...overrides,
  };
}
