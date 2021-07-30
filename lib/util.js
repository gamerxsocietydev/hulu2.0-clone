import { Model } from './models/Model'

export function rowsWithGeo(rows) {
  const knex = Model.knex()
  return rows.map((attributes) => {
    const { lat, lon } = attributes
    if (lat && lon) {
      return {
        ...attributes,
        geoloc: knex.raw('ST_SetSRID(ST_MakePoint(?, ?), 4326)', [lon, lat]),
      }
    }
    return attributes
  })
}

// Insert new rows and update existing rows if updated
export async function batchUpsertModified(tableName, rows, trx = undefined) {
  const knex = trx || Model.knex()
  return knex(tableName)
    .insert(rows)
    .onConflict('id')
    .merge()
    .whereRaw(`${tableName}.updated_at < excluded.updated_at`)
}

// Will insert new rows, delete missing rows, and leave existing rows from batch
export async function batchUpsertOverwrite(
  tableName,
  rows,
  keys = ['id'],
  trx = undefined
) {
  const knex = trx || Model.knex()
  if (!rows.length) return knex(tableName).delete()
  const joined = keys.join(',')
  await knex.raw(
    `WITH updated as (
      ${knex.raw(`${knex(tableName).insert(rows).toQuery()}
        ON CONFLICT (${joined})
        DO UPDATE SET ${keys[0]}=excluded.${keys[0]}
        RETURNING ${joined}
      `)})

    ${knex(tableName)
      .delete()
      .whereRaw(
        `(${joined}) NOT IN (
          SELECT ${keys.map((k) => `updated.${k}`).join(',')} FROM updated)`
      )
      .toQuery()}
  `
  )
}
