import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { getClient } from './clients/steam'
import splitcc from 'split-camelcase'

import {
  findAchievementsForPlatformAndGame,
  findUserAchievementsForPlatformAndGame,
  storeNewGameAchievements,
  addNewPlayerAchievements,
} from './achievements'
import { findPlatformAccountByUserIdAndPlatform } from './user'

const platform = 'steam'

export async function fetchGames(accountId) {
  const rawResult = await getClient()
    .getOwnedGames(accountId)
    .then((result) => {
      return result.data.games
    })
  return rawResult.map((rr) => ({
    gameId: rr.appID,
  }))
}

// For a game, insert any new achievements if needed
// - fetch achievements and their global completion percentage
// - convert data into internal achievements format
async function fetchGameAchievements(accountId, gameId) {
  const achievementData = await getClient()
    .getGlobalAchievements(gameId)
    .then((result) => {
      return result.data.achievements
    })
  const game = await getClient()
    .getOwnedGames(accountId, [gameId], true)
    .then((result) => {
      return result.data.games[0]
    })

  const keys = Object.keys(achievementData)

  const tiers = [5, 65, 100] // gold, silver, bronze
  const achRaw = keys.map((k) => {
    const display_name = splitcc(_.camelCase(k)).join(' ')
    const tier = _.findIndex(tiers, (tier) => tier >= achievementData[k]) + 1
    return {
      platform,
      platform_game_id: String(gameId),
      platform_achievement_id: k,
      game_title: game.name,
      display_name,
      tier,
    }
  })

  return achRaw
}

export async function importPlayerGameAchievements(
  userId,
  accountId,
  gameId,
  isInitial
) {
  const newGameAchievements = await fetchGameAchievements(accountId, gameId)
  // save new achievements
  await storeNewGameAchievements(platform, gameId, newGameAchievements)
  await storeNewPlayerAchievements({ userId, accountId, gameId, isInitial })
}

// For a user and a Steam game, insert new player achievements
// - Fetch user's achievements for game via Steam API
// - Filter out unearned achievements
// - pass to service to store unseen achievements and award points if isInitial
async function storeNewPlayerAchievements({
  userId,
  accountId,
  gameId,
  isInitial,
}) {
  const playerAchievements = await getClient()
    .getAchievements(accountId, gameId)
    .then((result) => {
      return result.data.achievements
    })
  const achievementIds = Object.keys(playerAchievements).filter(
    (k) => playerAchievements[k].unlocked
  )
  await addNewPlayerAchievements({
    userId,
    platform,
    gameId,
    achievementIds,
    isInitial,
  })
}

export async function importAllPlayerAchievements(
  userId,
  accountId,
  isInitial
) {
  console.log('syncing steam', accountId)
  const games = await fetchGames(accountId)
  await Promise.all(
    games.map((g) =>
      importPlayerGameAchievements(userId, accountId, g.gameId, isInitial)
    )
  )
}

export async function importAllPlayerAchievementsForSteam(
  userId,
  isInitial = false
) {
  const account = await findPlatformAccountByUserIdAndPlatform(userId, platform)
  return importAllPlayerAchievements(
    userId,
    account.platform_account_id,
    isInitial
  )
}
