/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const up = (knex) =>
  knex.schema
    .createTable('labels', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('task_labels', (table) => {
      table
        .integer('task_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tasks')
        .onDelete('CASCADE');
      table
        .integer('label_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('labels')
        .onDelete('CASCADE');
      table.primary(['task_id', 'label_id']);
    });

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const down = (knex) => {
  return knex.schema.dropTable('task_labels').dropTable('labels');
};
