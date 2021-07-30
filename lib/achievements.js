import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { Achievement } from './models/Achievement'
import { addUserPointsById } from './user'

export async function findAchievements() {
  return Achievement.query()
}

export async function findAchievementsByUserId(userId) {
  return Achievement.query().whereExists(
    Achievement.relatedQuery('users').where('user_id', userId)
  )
}

export async function findAchievementsForPlatformAndGame(
  platform,
  platform_game_id
) {
  return Achievement.query().where({
    platform,
    platform_game_id: platform_game_id.toString(),
  })
}

export async function findUserAchievementsForPlatformAndGame(
  user_id,
  platform,
  platform_game_id
) {
  return Achievement.query()
    .where({ platform, platform_game_id: platform_game_id.toString() })
    .withGraphJoined('users')
    .where('users.id', user_id)
}

export async function storeNewGameAchievements(
  platform,
  gameId,
  achievements,
  trx = undefined
) {
  if (!achievements.length) return []

  const storedAchievements = await Achievement.query(trx).where({
    platform,
    platform_game_id: gameId.toString(),
  })

  const filtered = achievements
    .filter(
      ({ platform_achievement_id }) =>
        !_.find(storedAchievements, { platform_achievement_id })
    )
    .map((a) => ({
      ...a,
      id: uuidv4(),
    }))

  if (filtered.length) {
    await Achievement.query(trx).insert(filtered)
  }
  return filtered
}

const POINTS = [30, 20, 10] // gold, silver, bronze tiers

export async function addNewPlayerAchievements(
  { userId, platform, gameId, achievementIds, isInitial },
  trx = undefined
) {
  const knex = trx || Achievement.knex()

  const result = await knex.raw(
    'select "user_achievement".* from "user_achievement" where "user_achievement"."user_id" = ?;',
    userId
  )
  const earnedIds = result.rows.map((a) => a.achievement_id)

  const storedAchievements = await Achievement.query(trx)
    .where({
      platform,
      platform_game_id: gameId.toString(),
    })
    .whereIn('platform_achievement_id', achievementIds)
    .whereNotIn('id', earnedIds)
    .withGraphFetched('rewards')

  if (!storedAchievements.length) {
    return
  }

  let newPoints = 0

  const earned = storedAchievements.map((sa) => {
    // No points awarded if initial import or a challenge reward was awarded
    const points_earned =
      isInitial || sa.rewards?.length ? 0 : POINTS[sa.tier - 1]
    newPoints += points_earned
    return {
      user_id: userId,
      achievement_id: sa.id,
      points_earned,
    }
  })

  // Prepare challenge rewards to insert
  const rewards = _.flatten(
    storedAchievements
      .filter((sa) => sa.rewards?.length)
      .map((sa) => {
        return sa.rewards.map((r) => ({
          reward_id: r.id,
          by_achievement_id: sa.id,
          user_id: userId,
          points_spent: 0,
        }))
      })
  )

  await knex('user_achievement').insert(earned)
  if (!isInitial) {
    // update user point balance
    if (newPoints) {
      await addUserPointsById(userId, newPoints, trx)
    }
    // Award challenges
    if (rewards.length) {
      await knex('unlocked_reward')
        .insert(rewards)
        .onConflict(['user_id', 'reward_id'])
        .ignore()
    }
  }

  return
}
