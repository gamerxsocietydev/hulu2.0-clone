import _ from 'lodash'
import nextConnect from 'next-connect'
import { getRewardCategories } from '../../../lib/reward'

function onError(err, req, res) {
  console.warn(err)
  throw err
}
const handler = nextConnect({ onError })

handler.get(async (req, res) => {
  const categories = await getRewardCategories()
  res.json({ categories })
})

export default handler
