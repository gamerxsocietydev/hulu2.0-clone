import { Strategy as XboxLiveStrategy } from 'passport-xbox'

import { signUpOrSignInWithAccount } from '../user'

const platform = 'xboxlive'

// passport config values
const clientID = process.env.XBOXLIVE_CLIENT_ID
const clientSecret = process.env.XBOXLIVE_API_KEY
const callbackURL = process.env.XBOXLIVE_RETURN_URL

export const handler = async function (
  req,
  accessToken,
  refreshToken,
  rawProfile,
  done
) {
  const { id: xboxliveId, username: display_name } = rawProfile

  const profile = {
    platform,
    platform_account_id: xboxliveId,
    display_name,
    access_token: accessToken,
    refresh_token: refreshToken,
  }

  let user
  try {
    user = (
      await signUpOrSignInWithAccount({
        sessionUser: req?.user,
        profile,
        rawProfile,
        disableSignUp: true,
      })
    ).user
  } catch (e) {
    console.error(e)
    return done(e)
  }

  return done(null, user)
}

export const strategy = new XboxLiveStrategy(
  {
    clientID,
    clientSecret,
    callbackURL,
    scope: 'Xboxlive.signin Xboxlive.offline_access',
    passReqToCallback: true,
  },
  handler
)
