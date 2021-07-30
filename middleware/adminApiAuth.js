import nextConnect from 'next-connect'
import jwt from 'jsonwebtoken'

const adminApiAuth = nextConnect().use((req, res, next) => {
  const secret = new Buffer(process.env.ADMIN_TOKEN_SECRET, 'base64')
  const { token } = req.query
  if (!token || !secret) {
    return res.status(401).send('unauthenticated')
  }
  try {
    const decoded = jwt.verify(token, secret)
    console.log(decoded)
    next()
  } catch (e) {
    res.status(401).send('unauthenticated')
  }
})

export default adminApiAuth
