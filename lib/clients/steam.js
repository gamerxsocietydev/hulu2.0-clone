import steam from 'steam-js-api'

const apiKey = process.env.STEAM_API_KEY
steam.setKey(apiKey)

export function getClient() {
  return steam
}
