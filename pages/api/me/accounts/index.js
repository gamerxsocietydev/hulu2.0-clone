import nextConnect from 'next-connect'
import _ from 'lodash'
import auth from '../../../../middleware/auth'
import requireAuth from '../../../../middleware/requireAuth'
import { findPlatformAccountsByUserId } from '../../../../lib/user'

const handler = nextConnect()

const attrs = [
  'id',
  'display_name',
  'avatar_url',
  'platform',
  'platform_account_id',
]

handler
  .use(auth)
  .use(requireAuth)
  .get(async (req, res) => {
    const accounts = await findPlatformAccountsByUserId(req.user.id)
    res.json({ accounts: accounts.map((a) => _.pick(a, attrs)) })
  })

export default handler
