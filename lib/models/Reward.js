import { Model } from './Model'
import { RewardCode } from './RewardCode'
import { User } from './User'

export class Reward extends Model {
  static tableName = 'reward'

  static get virtualAttributes() {
    return ['purchasable', 'unlocked', 'redeemed', 'code']
  }

  get purchasable() {
    return !!this.point_cost
  }

  get unlocked() {
    return this.unlockers?.length > 0
  }

  get redeemed() {
    return this.codes?.length > 0
  }

  get code() {
    return this.codes?.[0]?.code
  }

  get expiration_date() {
    return this.redeemed
      ? this.codes?.[0].expiration_date
      : this.global_expiration_date
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'string' },
        display_name: { type: 'string' },
        description: { type: 'string' },
        category: { type: 'string' },
        image_url: { type: 'string' },
        point_cost: { type: 'integer' },
        unlisted: { type: 'boolean', default: false },
        expiration_duration: { type: 'integer' },
        global_expiration_date: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    return {
      unlockers: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          to: 'user.id',
          through: {
            to: 'unlocked_reward.user_id',
            from: 'unlocked_reward.reward_id',
          },
          from: 'reward.id',
        },
      },
      codes: {
        relation: Model.HasManyRelation,
        modelClass: RewardCode,
        join: {
          from: 'reward_code.reward_id',
          to: 'reward.id',
        },
      },
      redeemedCodes: {
        relation: Model.HasManyRelation,
        modelClass: RewardCode,
        modify: 'redeemed',
        join: {
          from: 'reward_code.reward_id',
          to: 'reward.id',
        },
      },
    }
  }
}
