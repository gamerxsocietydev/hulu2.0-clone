import SteamStrategy from 'passport-steam'

import { signUpOrSignInWithAccount } from '../user'
import { importAllPlayerAchievements } from '../steam'

const platform = 'steam'

// passport config values
const apiKey = process.env.STEAM_API_KEY
const returnURL = process.env.STEAM_RETURN_URL
const realm = process.env.STEAM_REALM

export const handler = async function (req, identifier, rawProfile, done) {
  const {
    id: steamid,
    _json: { personaname: display_name, avatar: avatar_url },
  } = rawProfile

  const profile = {
    platform,
    platform_account_id: steamid,
    display_name,
    avatar_url,
  }

  let user
  let isInitial
  try {
    const result = await signUpOrSignInWithAccount({
      sessionUser: req?.user,
      profile,
      rawProfile,
    })
    user = result.user
    isInitial = result.isInitial
  } catch (e) {
    console.error(e)
    return done(e)
  }

  try {
    // Import any new achievements
    await importAllPlayerAchievements(user.id, steamid, isInitial)
    req.session.lastPlayerSync = Date.now()
  } catch (e) {
    console.error(e)
    return done('failed to import achievements')
  }

  return done(null, user)
}

export const strategy = new SteamStrategy(
  {
    returnURL,
    realm,
    apiKey,
    passReqToCallback: true,
  },
  handler
)
