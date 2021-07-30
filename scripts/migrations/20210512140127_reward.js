exports.up = async function (knex) {
  await knex.schema.createTable('supplier', (table) => {
    table.uuid('id').primary()
    table.string('display_name')
    table.string('logo_url')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('reward', (table) => {
    table.uuid('id').primary()
    table.string('image_url')
    table.string('display_name')
    table.string('description')
    table.uuid('supplier_id').references('id').inTable('supplier')
    table.integer('point_cost').unsigned()
    table.string('category').index()
    table.timestamp('global_expiration_date')
    table.integer('expiration_duration').unsigned()
    table.boolean('unlisted').defaultTo(false).notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('unlocked_reward', (table) => {
    table.uuid('user_id').references('id').inTable('user')
    table.uuid('reward_id').references('id').inTable('reward')

    table.integer('points_spent').unsigned()
    table.uuid('by_achievement_id').references('id').inTable('achievement')

    table.timestamp('created_at').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('reward_code', (table) => {
    table.uuid('id').primary()
    table.uuid('reward_id').references('id').inTable('reward')
    table.string('code')
    table.string('asset_url')
    table.timestamp('expiration_date')
    table.uuid('redeemed_by_user_id').references('id').inTable('user')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('achievement_reward', (table) => {
    table.uuid('achievement_id').references('id').inTable('achievement')
    table.uuid('reward_id').references('id').inTable('reward')

    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = async function (knex) {
  await knex.raw(
    'DROP TABLE reward, supplier, unlocked_reward, reward_code, achievement_reward'
  )
}
