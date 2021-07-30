exports.up = async function (knex) {
  await knex.schema.createTable('platform_account', (table) => {
    table.uuid('id').primary()
    table.string('platform').notNullable()
    table.string('platform_account_id').notNullable()
    table.unique(['platform', 'platform_account_id'])
    table.string('display_name').index()
    table.string('avatar_url')
    table.text('access_token')
    table.text('refresh_token')
    table.json('profile_data')
    table.uuid('user_id').references('id').inTable('user').onDelete('SET NULL')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = async function (knex) {
  await knex.raw('DROP TABLE platform_account CASCADE')
}
