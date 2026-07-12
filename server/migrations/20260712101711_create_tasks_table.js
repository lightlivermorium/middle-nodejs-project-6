/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const up = (knex) =>
  knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('description').nullable();
    table
      .integer('status_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('statuses');
    table
      .integer('creator_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
    table
      .integer('executor_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  knex.schema.dropTable('tasks');
};
