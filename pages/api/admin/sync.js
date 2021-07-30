import nextConnect from 'next-connect'

import { syncAllDatabases } from '../../../lib/admin'
import adminApiAuth from '../../../middleware/adminApiAuth'

function onError(err, req, res) {
  console.warn(err)
  //res.status(500).end(err.toString())
  // OR: you may want to continue
  throw err
}

const handler = nextConnect({ onError })

handler.use(adminApiAuth).get(async (req, res) => {
  await syncAllDatabases()
  res.send('ok')
})

export default handler
