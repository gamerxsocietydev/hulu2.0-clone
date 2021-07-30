import nextConnect from 'next-connect'

const requireAuth = nextConnect().use((req, res, next) => {
  if (!req.user) {
    res.status(401).send('unauthenticated')
  } else {
    next()
  }
})

export default requireAuth
