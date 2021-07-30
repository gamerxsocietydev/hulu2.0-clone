import { findUserById, createUserAndPlatformAccount } from '../user'
import { handler } from './passport.steam'
import * as steamMod from '../steam'

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

const profileResponse = {
  id: profile.steamid,
  _json: profile,
}

const gameId = 252950

describe('passport.steam.js', () => {
  const identifier = 'not important'

  it('should sign up with new account and fetch achievements', async () => {
    steamMod.importAllPlayerAchievements = jest.fn()

    const req = {}
    const done = jest.fn()
    const result = await handler(req, identifier, profileResponse, done)
    expect(steamMod.importAllPlayerAchievements).toHaveBeenCalledTimes(1)
    expect(steamMod.importAllPlayerAchievements).toHaveBeenCalledWith(
      expect.any(String),
      profile.steamid,
      true
    )
    expect(done).toHaveBeenCalledTimes(1)
  })
})
