exports.up = async function (knex) {
  await knex.schema.table('unlocked_reward', (table) => {
    table.primary(['reward_id', 'user_id'])
  })
}

exports.down = async function (knex) {}
