/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email');
    table.string('first_name');
    table.string('last_name');
    table.string('password_digest');
    table.timestamps(true, true);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const down = (knex) => {
  return knex.schema.dropTable('users');
};
