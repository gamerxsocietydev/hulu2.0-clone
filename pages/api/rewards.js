import _ from 'lodash'
import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import { getRewardsWithCodesForUser } from '../../lib/reward'

function onError(err, req, res) {
  console.warn(err)
  //res.status(500).end(err.toString())
  // OR: you may want to continue
  throw err
}
const handler = nextConnect({ onError })

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

handler.use(auth).get(async (req, res) => {
  const userId = req.user?.id
  const filters = req?.query
  const rewards = (
    await getRewardsWithCodesForUser(userId, filters)
  ).map((reward) => _.pick(reward, keys))
  res.json({ rewards })
})

export default handler
