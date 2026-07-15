import { faker } from '@faker-js/faker';

export function buildUser(overrides = {}) {
  return {
    email: faker.internet.exampleEmail(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: '12345678',
    ...overrides,
  };
}
