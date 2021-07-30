import nextConnect from 'next-connect'
import auth from '../../../../middleware/auth'
import passport from '../../../../lib/api/passport'
const handler = nextConnect()

handler.use(auth).get(passport.authenticate('xbox'), function (req, res) {
  console.log('go to xboxlive')
})

export default handler
