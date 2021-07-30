exports.up = async function (knex) {
  await knex.schema.createTable('user', (table) => {
    table.uuid('id').primary()
    table.string('display_name')
    table.string('avatar_url')
    table.integer('points').unsigned().defaultTo(0)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = async function (knex) {
  await knex.raw('DROP TABLE "user" CASCADE')
}
