import passport from 'passport'

import { strategy as steamStrategy } from './passport.steam'
import { strategy as xboxliveStrategy } from './passport.xboxlive'
import { findUserById } from '../user'

passport.use(steamStrategy)
passport.use(xboxliveStrategy)

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user.id)
})

passport.deserializeUser(async function (req, id, done) {
  // deserialize the username back into user object
  try {
    const user = await findUserById(id)
    return done(null, user || null)
  } catch (e) {
    console.warn(e)
  }
  return done(null, null)
})

export default passport
