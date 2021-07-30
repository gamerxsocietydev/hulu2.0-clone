exports.up = async function (knex) {
  await knex.schema.createTable('achievement', (table) => {
    table.uuid('id').primary()
    table.string('display_name')
    table.string('platform').notNullable()
    table.string('platform_game_id').notNullable()
    table.string('platform_achievement_id').notNullable()
    table.unique(['platform', 'platform_achievement_id', 'platform_game_id'])
    table.string('game_title')
    table.integer('tier').unsigned().notNullable() // 1 (gold), 2 (silver), 3 (bronze)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('user_achievement', (table) => {
    table.uuid('user_id').references('id').inTable('user')
    table.uuid('achievement_id').references('id').inTable('achievement')
    table.integer('points_earned').unsigned().defaultTo(0)
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = async function (knex) {
  await knex.raw('DROP TABLE achievement, user_achievement')
}
