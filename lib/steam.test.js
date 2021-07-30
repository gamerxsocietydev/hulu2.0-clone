import { createMockClient, achievementData } from './clients/steam.mock'
import {
  findUserById,
  createPlatformAccount,
  createUserAndPlatformAccount,
  createUserAndLinkAccount,
} from './user'
import { getKnex } from './knex'
import { seed } from '../scripts/seeds/01-demo'
import { getAllRewards, getRewardWithCodeForUser } from './reward'

import { importPlayerGameAchievements, fetchGames } from './steam'
import {
  findUserAchievementsForPlatformAndGame,
  findAchievementsForPlatformAndGame,
} from './achievements'

const knex = getKnex()

let mockClient = createMockClient()

jest.mock('./clients/steam', () => ({
  getClient: () => mockClient,
}))

const profile = {
  steamid: '76561198024964011',
  communityvisibilitystate: 3,
  profilestate: 1,
  personaname: 'zachseatdriver',
  profileurl: 'https://steamcommunity.com/profiles/76561198024964011/',
  avatar:
    'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997 310d705b2a6158ff8dc1cdfeb.jpg',
  avatarmedium:
    'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa 7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
  avatarfull:
    'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e 1997310d705b2a6158ff8dc1cdfeb_full.jpg',
  avatarhash: 'fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb',
  lastlogoff: 1597362013,
  personastate: 0,
  primaryclanid: '103582791429521408',
  timecreated: 1273702061,
  personastateflags: 0,
}

const setupUser = () => {
  const updatedProfileData = {
    platform: 'steam',
    platform_account_id: profile.steamid,
    display_name: profile.personaname,
  }

  return createUserAndPlatformAccount(updatedProfileData, profile)
}

const gameId = 252950
const platform = 'steam'

describe('steam.js', () => {
  it('should fetch games', async () => {
    const { user, account } = await setupUser()
    const result = await fetchGames(profile.steamid)
    expect(result.length).toEqual(4)
    expect(result[0].gameId).toBeDefined()
  })

  it('should import player game achievements', async () => {
    const { user, account } = await setupUser()
    await seed(knex)

    let userAchievements = await findUserAchievementsForPlatformAndGame(
      user.id,
      platform,
      gameId
    )
    expect(userAchievements.length).toEqual(0)

    await importPlayerGameAchievements(user.id, profile.steamid, gameId, true)
    userAchievements = await findUserAchievementsForPlatformAndGame(
      user.id,
      platform,
      gameId
    )
    expect(userAchievements.length).toEqual(6)
    let latestUser = await findUserById(user.id)
    expect(latestUser.points).toEqual(0)

    // test that it's idempotent
    await importPlayerGameAchievements(user.id, profile.steamid, gameId)
    userAchievements = await findUserAchievementsForPlatformAndGame(
      user.id,
      platform,
      gameId
    )
    expect(userAchievements.length).toEqual(6)
    latestUser = await findUserById(user.id)
    expect(latestUser.points).toEqual(0)

    // setup challenge reward
    const achievements = await findAchievementsForPlatformAndGame(
      'steam',
      gameId
    )
    const toAward = achievements.find(
      (a) => a.platform_achievement_id === 'Virtuoso'
    )
    const reward = (await getAllRewards())[0]
    await knex('achievement_reward').insert({
      reward_id: reward.id,
      achievement_id: toAward.id,
    })

    // Add a new achievement and check if it's imported and points awarded
    let newData = { ...achievementData }
    // bronze level
    newData.data.achievements['GreaseMonkey'] = {
      unlocked: true,
      time: 1560300327,
    }
    // gold level
    newData.data.achievements['Virtuoso'] = {
      unlocked: true,
      time: 1560300327,
    }
    // silver level
    newData.data.achievements['FullCourse'] = {
      unlocked: true,
      time: 1560300327,
    }
    const mockAchievementFn = jest.fn()
    mockAchievementFn.mockReturnValueOnce(Promise.resolve(newData))
    mockClient.getAchievements = mockAchievementFn

    await importPlayerGameAchievements(user.id, profile.steamid, gameId)
    userAchievements = await findUserAchievementsForPlatformAndGame(
      user.id,
      platform,
      gameId
    )
    expect(userAchievements.length).toEqual(9)
    latestUser = await findUserById(user.id)
    // Check bronze + silver points are counted. gold is excluded from points because of challenge reward
    expect(latestUser.points).toEqual(30)
    // check that challenge reward is unlocked
    const unlockedReward = await getRewardWithCodeForUser(user.id, reward.id)
    expect(unlockedReward.unlocked).toBe(true)
  })
})
