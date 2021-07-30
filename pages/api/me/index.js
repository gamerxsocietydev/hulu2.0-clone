import nextConnect from 'next-connect'
import base from '../../../middleware/base'
import auth from '../../../middleware/auth'
import playerSync from '../../../middleware/playerSync'
import requireAuth from '../../../middleware/requireAuth'
import { updateUserById } from '../../../lib/user'

function onError(err, req, res) {
  console.warn(err)
  res.status(500).json({ error: err.toString() })
}
const handler = nextConnect({ onError })

handler
  .use(auth)
  .use(playerSync)
  .get((req, res) => {
    if (!req.user) return res.json({})
    const { id, display_name, avatar_url, points } = req.user
    res.json({ user: { id, display_name, avatar_url, points } })
  })
  .use(requireAuth)
  .put((req, res) => {
    const { display_name } = req.body
    const user = updateUserById(req.user.id, { display_name })
    res.json({ user })
  })

export default handler
