import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import { getAllUsers } from '../../lib/user'

const handler = nextConnect()

handler.use(auth).get(async (req, res) => {
  const users = await getAllUsers()
  res.json({ users })
})

export default handler
