import nextConnect from 'next-connect'
import auth from '../../../../middleware/auth'
import requireAuth from '../../../../middleware/requireAuth'
import { redeemReward } from '../../../../lib/reward'

function onError(err, req, res) {
  console.warn(err)
  //res.status(500).end(err.toString())
  // OR: you may want to continue
  throw err
}

const handler = nextConnect({ onError })

handler
  .use(auth)
  .use(requireAuth)
  .post(async (req, res) => {
    const { rid } = req.query
    try {
      const reward = await redeemReward(req.user.id, rid)
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
