import nextConnect from 'next-connect'
import base from '../../../../middleware/base'
import auth from '../../../../middleware/auth'
import requireAuth from '../../../../middleware/requireAuth'
import { unlockReward } from '../../../../lib/reward'

const handler = nextConnect()

handler
  .use(base)
  .use(auth)
  .use(requireAuth)
  .post(async (req, res) => {
    const { rid } = req.query
    try {
      const reward = await unlockReward(req.user.id, rid)
      res.json({ ok: true, data: { reward } })
    } catch (e) {
      console.error(e)
      res.status(400).json({
        ok: false,
        message: `Unexpected error.`,
        error: e.toString(),
      })
    }
  })

export default handler
