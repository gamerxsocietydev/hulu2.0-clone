import _ from 'lodash'
import ObjToCSV from 'objects-to-csv'
import { getClient } from './clients/notion'
import { rowsWithGeo, batchUpsertModified, batchUpsertOverwrite } from './util'
import { findAchievements } from './achievements'

export const SUPPLIER_DBID = '921ffed6cba4433f9cd05343aced02e4'
export const REWARD_DBID = 'd136c04d7bd14f40a3f46e30262b6c64'
export const REWARD_CODE_DBID = 'ee78640b99a74d4884702cf7b9d983be'
export const ACHIEVEMENT_REWARD_DBID = 'b5b7cc27971d4c0391e04e300f5d6728'

const dbToTableMap = {
  [SUPPLIER_DBID]: 'supplier',
  [REWARD_DBID]: 'reward',
  [REWARD_CODE_DBID]: 'reward_code',
  [ACHIEVEMENT_REWARD_DBID]: 'achievement_reward',
}
// Should be ordered to appease foreign keys
const databasesToSync = [SUPPLIER_DBID, REWARD_DBID, REWARD_CODE_DBID]

const linkingTablesToSync = [ACHIEVEMENT_REWARD_DBID]

function mapColumnToInternal(val, key) {
  return (
    key &&
    key
      .replace(/\s*\(.*\)\s*/, '')
      .toLowerCase()
      .split(' ')
      .join('_')
  )
}

function mapValueToInternal(row) {
  switch (row.type) {
    case 'title':
      return row.title.map((rt) => rt.plain_text.trim()).join('')
    case 'rich_text':
      return row.rich_text.map((rt) => rt.plain_text.trim()).join('')
    case 'checkbox':
      return row.checkbox
    case 'number':
      return row.number
  }
  return null
}

async function fetchRows(databaseId, keys = ['id']) {
  const response = await getClient().databases.query({
    database_id: databaseId,
  })
  const rows = response.results
    .map((result) => {
      const renamed = _.mapKeys(result.properties, mapColumnToInternal)
      const mapped = _.mapValues(renamed, mapValueToInternal)
      mapped.updated_at = result.last_edited_time
      return mapped
    })
    .filter((row) => !_.isEmpty(_.filter(_.values(_.pick(row, keys)))))
  return rows
}

export async function syncDatabase(databaseId, trx = undefined) {
  const fetched = await fetchRows(databaseId)
  const result = await batchUpsertModified(
    dbToTableMap[databaseId],
    rowsWithGeo(fetched),
    trx
  )
  return result
}

export async function syncLinkingDatabase(databaseId, keys, trx = undefined) {
  const fetched = await fetchRows(databaseId, keys)
  const result = await batchUpsertOverwrite(
    dbToTableMap[databaseId],
    fetched.map((r) => _.pick(r, keys)),
    keys,
    trx
  )
  return result
}

export async function syncAllDatabases() {
  await databasesToSync.reduce(
    (p, databaseId) => p.then(() => syncDatabase(databaseId)),
    Promise.resolve()
  )
  return syncLinkingDatabase(ACHIEVEMENT_REWARD_DBID, [
    'achievement_id',
    'reward_id',
  ])
}

export async function getAchievementsCSV() {
  const data = await findAchievements()
  return new ObjToCSV(data).toString()
}
