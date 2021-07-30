import { findUserById, createUserAndPlatformAccount } from '../user'
import { handler } from './passport.xboxlive'

const profile = {
  gtg: 'BACON AVOCADO',
  xid: '2535473184114343',
  uhs: '14159265027447243096',
  agg: 'Adult',
  usr: '195 234',
  utr: '190',
  prv:
    '185 186 187 188 191 193 196 198 199 200 201 203 204 205 206 208 211 217 220 224 227 228 235 238 245 247 249 252 254 255',
}

const profileResponse = {
  provider: 'xbox',
  id: profile.xid,
  username: profile.gtg,
  age: profile.agg,
  uhs: profile.uhs,
  _raw: profile,
}

describe('passport.xboxlive.js', () => {
  const access_token =
    'EwAoA+pvBAAUKods63Ys1fGlwiccIFJ+qE1hANsAAXCDzYDA9Bz6UwHkEtlGJsDkmZEC3IRWz/7ofpUa0nHQHaS/NgxhfYnkm9U7u19Vh9GfxZl3t6962/xzQL0wim+mtsauO15KiP5R8cR9sTbQbCRiinG1FVsJd1Sl/6/3cGX7Gu1deo3S7qjHyIKMVbbxB7AcPm8+cwl1ugkTqBwrkmkNF7RHhEguo6FhGHyC1k379CitIVYmaF9F5PRYuV89Jk8E/vP7+nPe9SlSPLlCAlZY8GuzhDyLZ4qswrA7naPmugJQX1gN2Ssezk98yN9eCBfXgC4dVVnXMAQrKr33FNqVAYPuYDsG8oUYw5Xpo8Weg771Zr1y8F2lbwhuUXQDZgAACBqp84zbO6H3+AFNhODdgKgSOm/2EHBWlGdU7//DyH/kmDr1WjE23k5lnmKa9g1LOizsVTYMODpFB0f8c4yXjXUSjs+l072Tu9QHYFKyyhKYVezRZ4uUJuuNrxNG/DtKi1/vz8X+7K8vNKxDaNQ6swsttAsGxM5VQOdmC4p/8cuYjQVUR0Lk7/Vg9RQ0NTjteHadMqhFXXW9J/0yFNsm54CaOvX8CoKQYyVdHABQhd62S6iNZFftEa+FWPJfuL/0nWIwKR4U7lPKYheUoZGPsqEyWdz2EUsETDOoujGmTzc1bF++PAJyFzzzGHXJDkcoJUpQjtHHgrc4h4aLycdlvu9bVLgFaLrMx00rC7mqH8JwLlZCAzENQIsmL7l0MDnmuYSNzsX2GWVv94pkQW8nHt22giPweNgHFZF49wKHOSUZUPIT7OrE5w1zxxsqea2t3ezs5JrrZAdhMOTgUWn6IAnMHI1qI2lZiMg2feeCnru8egrhO066l5S+PC7NuBwwR1k28kOM4Fno2vinVxAiATx3yuwo32dU5eSw0Qys3ivmcZIulaX6X2vE/vfkXCF09AeLvGeKgCC4oTvaRM6d4Omz+Nctj3H9yz2Op2cDb3HDunminLefV7tII4Y1p8E9RgjVMqTwxoPrAZLb63VhDYxC7ci8Tv6JoBChPMf/iXLH2DonAg=='
  const refresh_token =
    'M.R3_BAY.-Ca9msmYyf1Gj9KElnUXjPv*q61DTJRFYJQsttlpWrWfGAqtPpxf15gm8LGs3jPo2nHeiyswLJIQ7ciZMU1D!Bx6*6RcsjM1q11w*op3cNjz1TvvXsUU2DiUc891DGRkd3*L9szPgGD!4oR9wmNZAofg7EHLSdj6PQER1DxKbY64GH1E7B*WV1FnnhLFOs4plHDXPgkpWKp93gXV33OR7uIHanBzR*!spuCfM4GO2lMwi8gU7T1HdzzV6ZQ6RTeM5lUdJt9VkcJF8Q*n6xzq1upg1FE4Erto1e8hVEgSXsNeX'

  it('should link new xbl account', async () => {
    const setupUser = () => {
      const profile = {
        steamid: '76561198024964011',
        communityvisibilitystate: 3,
        profilestate: 1,
        personaname: 'zachseatdriver',
        profileurl: 'https://steamcommunity.com/profiles/76561198024964011/',
        avatar:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997 310d705b2a6158ff8dc1cdfeb.jpg',
        avatarmedium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa 7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
        avatarfull:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e 1997310d705b2a6158ff8dc1cdfeb_full.jpg',
        avatarhash: 'fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb',
        lastlogoff: 1597362013,
        personastate: 0,
        primaryclanid: '103582791429521408',
        timecreated: 1273702061,
        personastateflags: 0,
      }
      const updatedProfileData = {
        platform: 'steam',
        platform_account_id: profile.steamid,
        display_name: profile.personaname,
      }

      return createUserAndPlatformAccount(updatedProfileData, profile)
    }
    const { user } = await setupUser()
    const req = { user }
    const done = jest.fn()
    const result = await handler(
      req,
      access_token,
      refresh_token,
      profileResponse,
      done
    )
    expect(done).toHaveBeenCalledTimes(1)
    expect(done).toHaveBeenCalledWith(null, user)
  })

  it('should fail sign up with new xbl account', async () => {
    const req = {}
    const done = jest.fn()
    const result = await handler(
      req,
      access_token,
      refresh_token,
      profileResponse,
      done
    )
    expect(done).toHaveBeenCalledTimes(1)
    expect(done).toHaveBeenCalledWith(expect.any(Error))
  })
})
