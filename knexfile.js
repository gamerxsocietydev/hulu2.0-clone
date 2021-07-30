const { loadEnvConfig } = require('@next/env')

const dev = process.env.NODE_ENV !== 'production'
const { DATABASE_URI } = loadEnvConfig('./', dev).combinedEnv

module.exports = {
  client: 'pg',
  connection: DATABASE_URI,
  useNullAsDefault: true,
  migrations: {
    directory: './scripts/migrations',
  },
  seeds: {
    directory: './scripts/seeds',
  },
}
