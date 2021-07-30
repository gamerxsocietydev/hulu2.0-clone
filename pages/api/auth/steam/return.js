import nextConnect from 'next-connect'
import auth from '../../../../middleware/auth'
import passport from '../../../../lib/api/passport'
const handler = nextConnect()

handler
  .use(auth)
  .get(
    passport.authenticate('steam', { failureRedirect: '/' }),
    function (req, res) {
      res.redirect('/')
    }
  )

export default handler
