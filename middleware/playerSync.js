import nextConnect from 'next-connect'
import { importAllPlayerAchievementsForSteam } from '../lib/steam'

const SYNC_PERIOD = 60 * 60 * 1000 // 1 hour in milliseconds

const playerSync = nextConnect().use(async (req, res, next) => {
  if (
    req.user?.id &&
    (!req.session.lastPlayerSync ||
      req.session.lastPlayerSync + SYNC_PERIOD < Date.now())
  ) {
    await importAllPlayerAchievementsForSteam(req.user.id, false)
    req.session.lastPlayerSync = Date.now()
  }
  next()
})

export default playerSync
