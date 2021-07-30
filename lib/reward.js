import { v4 as uuidv4 } from 'uuid'
import { Reward } from './models/Reward'
import { RewardCode } from './models/RewardCode'
import { findUserById, addUserPointsById } from './user'
import { rowsWithGeo, batchUpsertModified } from './util'

export async function getAllRewards() {
  return Reward.query()
}

export async function batchCreateRewards(batchAttributes, trx = undefined) {
  const rows = batchAttributes.map((attributes) => ({
    ...attributes,
    id: uuidv4(),
  }))
  return Reward.query(trx).insertAndFetch(rowsWithGeo(rows))
}

export async function createReward(attributes, trx = undefined) {
  return (await batchCreateRewards([attributes], trx))[0]
}

export async function findRewardById(id) {
  return Reward.query().findById(id).skipUndefined()
}

export async function importCodesForReward(reward, codes, trx = undefined) {
  const data = codes.map((code) => ({
    id: uuidv4(),
    reward_id: reward.id,
    code,
  }))
  return RewardCode.query(trx).insert(data)
}

export async function getRewardCategories() {
  return Reward.knex()('reward').pluck('category').distinct()
}

async function getUnredeemedCodeForReward(rewardId, trx = undefined) {
  return RewardCode.query(trx)
    .where('reward_id', rewardId)
    .where('redeemed_by_user_id', null)
    .first()
}

export async function unlockReward(userId, rewardId, trx = undefined) {
  const knex = trx || Reward.knex()
  const reward = await Reward.query(trx).findById(rewardId)
  const user = await findUserById(userId, trx)

  const result = await knex.raw(
    'select "unlocked_reward".* from "unlocked_reward" where "unlocked_reward"."reward_id" = ? and "unlocked_reward"."user_id" = ?;',
    [rewardId, userId]
  )
  const existingUnlock = result.rowCount > 0

  if (reward.unlisted) {
    throw new Error('Reward is unavailable')
  }
  if (
    reward.global_expiration_date &&
    reward.global_expiration_date < new Date()
  ) {
    throw new Error('Reward is now longer available')
  }
  if (!reward.purchasable) {
    throw new Error('Reward cannot be unlocked with points')
  }
  if (existingUnlock) {
    throw new Error("You've already unlocked this reward")
  }
  if (user.points < reward.point_cost) {
    throw new Error('Not enough points to unlock')
  }
  const nextCode = await getUnredeemedCodeForReward(rewardId, trx)
  if (!nextCode) {
    throw new Error('There are no codes currently available for this reward!')
  }

  await addUserPointsById(userId, -reward.point_cost, trx)
  await knex('unlocked_reward').insert({
    user_id: userId,
    reward_id: rewardId,
    points_spent: reward.points,
    created_at: new Date(),
  })

  return getRewardWithCodeForUser(userId, rewardId)
}

function deriveExpirationForCode(duration, expiration, fromDate = new Date()) {
  if (!duration && !expiration) {
    return
  }
  fromDate.setDate(fromDate.getDate() + duration)
  if (expiration && expiration < fromDate) {
    return expiration
  }
  return fromDate
}

export async function redeemReward(userId, rewardId, trx = undefined) {
  const knex = trx || Reward.knex()
  const reward = await Reward.query(trx).findById(rewardId)
  const user = await findUserById(userId, trx)
  const existingUnlock = await knex.raw(
    'select "unlocked_reward".* from "unlocked_reward" where "unlocked_reward"."reward_id" = ? and "unlocked_reward"."user_id" = ?;',
    [rewardId, userId]
  )
  if (!existingUnlock) {
    throw new Error('Reward must be unlocked first')
  }
  const nextCode = await getUnredeemedCodeForReward(rewardId, trx)
  if (!nextCode) {
    throw new Error('There are no codes currently available for this reward!')
  }
  const expiration = deriveExpirationForCode(
    reward.expiration_duration,
    reward.global_expiration_date
  )
  await nextCode.$query(trx).update({
    redeemed_by_user_id: userId,
    expiration_date: expiration?.toISOString(),
  })

  return getRewardWithCodeForUser(userId, rewardId, trx)
}

function buildUserRewardQuery(builder, userId) {
  return builder
    .withGraphFetched('codes')
    .withGraphFetched('unlockers')
    .modifyGraph('codes', (builder) => {
      builder.where('redeemed_by_user_id', userId)
    })
    .modifyGraph('unlockers', (builder) => {
      builder.where('user_id', userId)
    })
}

export async function getRewardsWithCodesForUser(
  userId,
  { categories, supplier_id, id, lat, lon, userOnly } = {},
  trx = undefined
) {
  const knex = trx || Reward.knex()
  const builder = Reward.query(trx).where({
    unlisted: false,
  })

  // avoid pg-mem bug https://github.com/oguimbal/pg-mem/issues/38
  if (process.env.NODE_ENV === 'test') {
    builder.select(['*'])
  } else {
    builder.select([
      '*',
      Reward.relatedQuery('unlockers').count().as('unlocked_count'),
      Reward.relatedQuery('redeemedCodes').count().as('redeemed_code_count'),
      Reward.relatedQuery('codes').count().as('total_code_count'),
    ])
  }

  if (id) {
    builder.where({ id })
  }
  if (categories && categories.length) {
    builder.whereIn('category', { categories })
  }
  if (supplier_id) {
    builder.where({ supplier_id })
  }

  if (userId) {
    buildUserRewardQuery(builder, userId)
  }
  if (userId && userOnly) {
    builder.whereExists(Reward.relatedQuery('unlockers').where('id', userId))
  }
  if (lat && lon) {
    builder
      .select([
        knex.raw(
          'geoloc::geography <-> ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography AS distance',
          [parseFloat(lon), parseFloat(lat)]
        ),
      ])
      .orderBy('distance', 'asc')
  }

  return builder
}

export async function getRewardWithCodeForUser(
  userId,
  rewardId,
  trx = undefined
) {
  const builder = Reward.query(trx).findById(rewardId)
  buildUserRewardQuery(builder, userId)
  return builder
}
