import nextConnect from 'next-connect'

function onError(err, req, res) {
  console.error(err)
  res.status(500).json({ error: err.toString() })
}
const base = nextConnect({ onError })

export default base
