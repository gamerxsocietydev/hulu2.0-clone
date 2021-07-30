import {
  supplierData,
  rewardData,
  createMockClient,
} from './clients/notion.mock'
import { syncDatabase, SUPPLIER_DBID, REWARD_DBID } from './admin'
import { getRewardsWithCodesForUser } from './reward'
import { batchUpsertModified } from './util'

let mockClient = createMockClient()
jest.mock('./clients/notion', () => ({
  getClient: () => mockClient,
}))

jest.mock('./util', () => ({
  ...jest.requireActual('./util.js'),
  batchUpsertModified: jest.fn(async () => ({})),
}))

beforeEach(() => {
  batchUpsertModified.mockClear()
})

describe('admin.js', () => {
  it('should sync databases', async () => {
    mockClient.databases.query = jest.fn(async () => supplierData)
    let result = await syncDatabase(SUPPLIER_DBID)
    expect(batchUpsertModified).toHaveBeenCalledTimes(1)
    expect(batchUpsertModified.mock.calls[0][0]).toEqual('supplier')
    expect(batchUpsertModified.mock.calls[0][1]).toHaveLength(2)
    mockClient.databases.query = jest.fn(async () => rewardData)
    result = await syncDatabase(REWARD_DBID)
    expect(batchUpsertModified).toHaveBeenCalledTimes(2)
    expect(batchUpsertModified.mock.calls[1][0]).toEqual('reward')
    expect(batchUpsertModified.mock.calls[1][1]).toHaveLength(3)
  })
})
