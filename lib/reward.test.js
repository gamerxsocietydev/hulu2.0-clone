import {
  findUserById,
  createUserAndPlatformAccount,
  addUserPointsById,
} from './user'

import { createSupplier } from './supplier'
import {
  createReward,
  importCodesForReward,
  unlockReward,
  redeemReward,
  getRewardsWithCodesForUser,
  getRewardCategories,
} from './reward'

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

describe('reward.js', () => {
  it('should allow a user to unlock and redeem a reward', async () => {
    const { user } = await setupUser()
    const supplier = await createSupplier({
      display_name: 'Nike',
    })
    const reward = await createReward({
      supplier_id: supplier.id,
      display_name: 'Test Reward',
      point_cost: 20,
      expiration_duration: 30,
    })
    const codes = ['code1', 'code2']
    await importCodesForReward(reward, codes)

    let queryResult = await getRewardsWithCodesForUser(user.id)
    expect(queryResult.length).toEqual(1)
    expect(queryResult[0].codes.length).toEqual(0)
    expect(queryResult[0].unlockers.length).toEqual(0)

    let error
    try {
      await unlockReward(user.id, reward.id)
    } catch (e) {
      error = e
    }
    expect(error).toBeDefined()
    expect(error.message).toEqual('Not enough points to unlock')

    await addUserPointsById(user.id, 30)
    await unlockReward(user.id, reward.id)
    let latestUser = await findUserById(user.id)
    expect(latestUser.points).toEqual(10)

    queryResult = await getRewardsWithCodesForUser(user.id)
    expect(queryResult.length).toEqual(1)
    expect(queryResult[0].codes.length).toEqual(0)
    expect(queryResult[0].unlockers.length).toEqual(1)

    await redeemReward(user.id, reward.id)
    queryResult = await getRewardsWithCodesForUser(user.id)
    expect(queryResult.length).toEqual(1)
    expect(queryResult[0].codes[0].redeemed_by_user_id).toEqual(user.id)
    expect(codes).toContain(queryResult[0].code)
  })

  it('should get distinct categories', async () => {
    const { user } = await setupUser()
    const supplier = await createSupplier({
      display_name: 'Nike',
    })
    await createReward({
      supplier_id: supplier.id,
      display_name: 'Test Reward',
      point_cost: 20,
      expiration_duration: 30,
      category: 'food',
    })
    await createReward({
      supplier_id: supplier.id,
      display_name: 'Test Reward',
      point_cost: 20,
      expiration_duration: 30,
      category: 'food',
    })
    await createReward({
      supplier_id: supplier.id,
      display_name: 'Test Reward',
      point_cost: 20,
      expiration_duration: 30,
      category: 'drink',
    })
    const results = await getRewardCategories()
    expect(results).toEqual(expect.arrayContaining(['food', 'drink']))
  })
})
