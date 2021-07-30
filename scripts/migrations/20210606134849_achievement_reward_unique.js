exports.up = async function (knex) {
  await knex.schema.table('achievement_reward', (table) => {
    table.primary(['reward_id', 'achievement_id'])
  })
}

exports.down = async function (knex) {}
