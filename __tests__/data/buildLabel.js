import { faker } from '@faker-js/faker';

export function buildLabel(overrides = {}) {
  return {
    name: faker.lorem.word(),
    ...overrides,
  };
}
