/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const up = (knex) =>
  knex.schema.createTable('statuses', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.timestamps(true, true);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const down = (knex) => {
  return knex.schema.dropTable('statuses');
};
