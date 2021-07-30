import { Model } from './Model'
import { User } from './User'

export class PlatformAccount extends Model {
  static get tableName() {
    return 'platform_account'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'string' },
        platform: { type: 'string' },
        platform_account_id: { type: 'string' },
        username: { type: 'string' },
        display_name: { type: 'string' },
        avatar_url: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'platform_account.user_id',
          to: 'user.id',
        },
      },
    }
  }
}
