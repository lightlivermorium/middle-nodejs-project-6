import { faker } from '@faker-js/faker';

export function buildTask(overrides = {}) {
  return {
    name: faker.person.fullName(),
    description: faker.lorem.sentence(),
    statusId: 1,
    executorId: 2,
    ...overrides,
  };
}
