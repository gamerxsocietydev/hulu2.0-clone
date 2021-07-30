import nextConnect from 'next-connect'
import auth from '../../../../middleware/auth'
import passport from '../../../../lib/api/passport'

function onError(err, req, res) {
  console.warn(err)
  //res.status(500).end(err.toString())
  // OR: you may want to continue
  throw err
}

const handler = nextConnect({ onError })
handler
  .use(auth)
  .get(
    passport.authenticate('xbox', { failureRedirect: '/profile' }),
    function (req, res) {
      res.redirect('/profile')
    }
  )

export default handler
