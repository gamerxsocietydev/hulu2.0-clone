import _ from 'lodash'
import nextConnect from 'next-connect'
import auth from '../../../middleware/auth'
import requireAuth from '../../../middleware/requireAuth'
import { getRewardsWithCodesForUser } from '../../../lib/reward'

function onError(err, req, res) {
  console.warn(err)
  res.status(500).json({ error: err.toString() })
}
const handler = nextConnect({ onError })
//const handler = nextConnect()

const keys = [
  'id',
  'display_name',
  'description',
  'category',
  'image_url',
  'purchasable',
  'point_cost',
  'unlocked',
  'redeemed',
  'code',
  'expiration_date',
  'distance',
  'unlocked_count',
  'redeemed_code_count',
  'total_code_count',
]
handler
  .use(auth)
  .use(requireAuth)
  .get(async (req, res) => {
    const rewards = (
      await getRewardsWithCodesForUser(req.user.id, {
        userOnly: true,
      })
    ).map((reward) => _.pick(reward, keys))
    res.json({ rewards })
  })

export default handler
