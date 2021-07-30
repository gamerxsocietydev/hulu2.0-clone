import { newDb } from 'pg-mem'
import config from './knexfile.js'

const db = newDb()
const mockKnex = db.adapters.createKnex()

jest.mock('./lib/knex', () => ({
  getKnex: () => mockKnex,
}))

let backup

beforeAll(async () => {
  console.info('Running migrations in: ' + config.migrations.directory)

  await mockKnex.migrate.latest(config.migrations).then(([batchNo, log]) => {
    if (!log.length) {
      console.info('Database is already up to date')
    } else {
      console.info('Ran migrations: ' + log.join(', '))
    }
  })
  backup = db.backup()
})

beforeEach(() => {
  backup.restore()
})

//await knexMigrate('up', {}, log)
//  await knexMigrate('down', { to: 0 }, log)

//// Important to destroy the database, otherwise Node script won't exit
//// because Knex keeps open handles.
//knex.destroy();
//});
