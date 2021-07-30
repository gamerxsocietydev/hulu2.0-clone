import nextConnect from 'next-connect'

import { getAchievementsCSV } from '../../../lib/admin'
import adminApiAuth from '../../../middleware/adminApiAuth'

function onError(err, req, res) {
  console.warn(err)
  //res.status(500).end(err.toString())
  // OR: you may want to continue
  throw err
}

const handler = nextConnect({ onError })

handler.use(adminApiAuth).get(async (req, res) => {
  const csv = await getAchievementsCSV()
  res.setHeader('Content-disposition', 'attachment; filename=achievements.csv')
  res.setHeader('Content-Type', 'text/csv')
  res.status(200).send(csv)
})

export default handler
