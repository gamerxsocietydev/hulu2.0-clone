import { parse, serialize } from 'cookie'
import { createLoginSession, getLoginSession } from './auth'

function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export default function session({ name, secret, cookie: cookieOpts }) {
  return async (req, res, next) => {
    const cookies = parseCookies(req)
    const token = cookies[name]
    let unsealed = {}
    let cached = JSON.stringify(unsealed)

    if (token) {
      try {
        // the cookie needs to be unsealed using the password `secret`
        unsealed = await getLoginSession(token, secret)
        cached = JSON.stringify(unsealed)
      } catch (e) {
        // The cookie is invalid
      }
    }

    req.session = unsealed

    const commitSession = async () => {
      if (cookieOpts.maxAge) {
        req.session.maxAge = cookieOpts.maxAge
      }
      // don't overwrite cookie unless session changed
      if (JSON.stringify(req.session) === cached) {
        return
      }

      const token = await createLoginSession(req.session, secret)

      res.setHeader('Set-Cookie', serialize(name, token, cookieOpts))
    }

    // We are proxying res.end and res.redirect to commit the session cookie
    const oldEnd = res.end
    res.end = async function resEndProxy(...args) {
      if (!res.finished && !res.writableEnded && !res.headersSent) {
        await commitSession()
      }
      oldEnd.apply(this, args)
    }
    const oldRedirect = res.redirect
    res.redirect = async function resRedirectProxy(...args) {
      if (!res.finished && !res.writableEnded && !res.headersSent) {
        await commitSession()
      }
      oldRedirect.apply(this, args)
    }
    next()
  }
}
