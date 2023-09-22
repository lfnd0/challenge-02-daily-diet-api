import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('snacks', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.date('date').notNullable()
    table.time('hour').notNullable()
    table.boolean('is_in_diet').defaultTo(true).notNullable()
    table.uuid('user_id').notNullable()
    table.foreign('user_id').references('id').inTable('users')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('snacks')
}
