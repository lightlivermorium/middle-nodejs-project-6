import { faker } from '@faker-js/faker';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('users').del();

  const createUser = () => ({
    email: faker.internet.exampleEmail(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    password_digest: '12345678',
  });

  await knex('users').insert([
    createUser(),
    createUser(),
    createUser(),
    createUser(),
    createUser(),
  ]);
}
