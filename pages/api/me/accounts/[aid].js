import nextConnect from 'next-connect'
import auth from '../../../../middleware/auth'
import requireAuth from '../../../../middleware/requireAuth'
import { unlinkPlatformAccount } from '../../../../lib/user'

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
  .delete(async (req, res) => {
    const { aid } = req.query
    await unlinkPlatformAccount(aid, req.user.id)
    res.json({ ok: true })
  })

export default handler
