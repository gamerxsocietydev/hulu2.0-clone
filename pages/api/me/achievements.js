import nextConnect from 'next-connect'
import auth from '../../../middleware/auth'
import requireAuth from '../../../middleware/requireAuth'
import { findAchievementsByUserId } from '../../../lib/achievements'

const handler = nextConnect()

handler
  .use(auth)
  .use(requireAuth)
  .get(async (req, res) => {
    if (!req.user.id) return []
    const achievements = await findAchievementsByUserId(req.user.id)
    res.json({ achievements })
  })

export default handler
