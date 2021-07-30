exports.seed = async function (knex) {
  const suppliers = [
    { id: '66fb201b-ba2f-4595-afd4-14dcdff13817', display_name: 'Nike' },
    { id: 'd7e55cdb-cf9f-42e4-add4-fa535d4f7443', display_name: 'Trader Joes' },
  ]
  if (process.env.NODE_ENV !== 'test') {
    await knex.raw('TRUNCATE TABLE supplier, reward, reward_code CASCADE')
  }
  await knex('supplier').insert(suppliers)

  const nikeLoc = [34.01369800364544, -118.49437359544993]
  const wineLoc = [34.0523076608066, -118.25155458888315]
  const rewards = [
    {
      id: '7361b777-79cf-4446-98ac-b7db34e42e73',
      display_name: '20% Off Shoes',
      point_cost: 20,
      supplier_id: suppliers[0].id,
      category: 'apparel',
      expiration_duration: 30,
      lon: nikeLoc[0],
      lat: nikeLoc[1],
    },
    {
      id: '062d6131-eba9-46c9-89df-5371c1e579e6',
      display_name: '50% Off Jackets',
      point_cost: 50,
      supplier_id: suppliers[0].id,
      category: 'apparel',
      expiration_duration: 30,
      lon: nikeLoc[0],
      lat: nikeLoc[1],
    },
    {
      id: '41c16f7d-79fd-4a63-b5f6-b71b2b3fb7f9',
      display_name: 'Free Wine Bottle',
      point_cost: 20,
      supplier_id: suppliers[1].id,
      category: 'food',
      expiration_duration: 30,
      lon: wineLoc[0],
      lat: wineLoc[1],
    },
  ]
  await knex('reward').insert(rewards)
  // test db doesn't have geolocation plugin so skip
  if (process.env.NODE_ENV !== 'test') {
    await knex.raw(`
    update reward as r set
    lat = r2.lat,
    lon = r2.lon,
    geoloc = ST_SetSRID(ST_MakePoint(r2.lon, r2.lat), 4326)
    from (values
      ('${rewards[0].id}'::uuid, ${nikeLoc[0]}, ${nikeLoc[1]}),
      ('${rewards[1].id}'::uuid, ${nikeLoc[0]}, ${nikeLoc[1]}),
      ('${rewards[2].id}'::uuid, ${wineLoc[0]}, ${wineLoc[1]})
    ) as r2(id, lat, lon)
    where r2.id = r.id;
  `)
  }

  const rewardCodes = [
    {
      id: '505a5cd4-4c8d-495e-b9e0-2bbf8e277c8f',
      code: 'ABEFD',
      reward_id: rewards[0].id,
    },
    {
      id: 'cd74fdfc-525c-4f27-9711-1d4f06a9a45f',
      code: 'SOENG',
      reward_id: rewards[0].id,
    },
    {
      id: '9c6a4621-4489-4711-b064-7e53f3263ab9',
      code: 'FYULA',
      reward_id: rewards[1].id,
    },
    {
      id: 'bf73e666-673e-4b5f-8b87-0115c84b127f',
      code: 'BLDAB',
      reward_id: rewards[1].id,
    },
    {
      id: '3e10102e-0f0d-47d0-90fe-9421f8a2cfe8',
      code: 'AUJBJ',
      reward_id: rewards[2].id,
    },
    {
      id: '980e6201-afb3-4608-a4d8-39414916023c',
      code: 'MKCDG',
      reward_id: rewards[2].id,
    },
  ]
  await knex('reward_code').insert(rewardCodes)
}
