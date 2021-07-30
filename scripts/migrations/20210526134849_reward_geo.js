exports.up = async function (knex) {
  await knex.schema.table('reward', (table) => {
    table.float('lat')
  })
  await knex.schema.table('reward', (table) => {
    table.float('lon')
  })
  // sql is mocked in test env and doesn't have GIS extension
  if (process.env.NODE_ENV !== 'test') {
    await knex.raw('ALTER TABLE reward ADD COLUMN geoloc geometry NULL;')

    // indices to potentially speed up some queries
    // https://gis.stackexchange.com/questions/247113/setting-up-indexes-for-postgis-distance-queries
    await knex.raw('CREATE INDEX reward_spx ON reward USING GIST (geoloc);')
    await knex.raw(
      'CREATE INDEX reward_gpx ON reward USING GIST (geography(geoloc));'
    )
  }
}

exports.down = async function (knex) {
  await knex.schema.table('reward', (table) => {
    table.dropColumn('lat')
    table.dropColumn('lon')
    if (process.env.NODE_ENV !== 'test') {
      table.dropColumn('geoloc')
    }
  })
}
