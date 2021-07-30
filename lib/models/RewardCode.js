import { Model } from './Model'

export class RewardCode extends Model {
  static get tableName() {
    return 'reward_code'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'string' },
        reward_id: { type: 'string' },
        code: { type: 'string' },
        asset_url: { type: 'string' },
        expiration_date: { type: 'string' },
        redeemed_by_user_id: { type: 'string' },
      },
    }
  }

  static get modifiers() {
    return {
      redeemed(builder) {
        builder.whereNotNull('redeemed_by_user_id')
      },
    }
  }
}
