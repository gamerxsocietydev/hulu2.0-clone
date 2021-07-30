import { Model } from './Model'
import { User } from './User'
import { Reward } from './Reward'

export class Achievement extends Model {
  static get tableName() {
    return 'achievement'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'string' },
        display_name: { type: 'string' },
        platform: { type: 'string' },
        platform_game_id: { type: 'string' },
        platform_achievement_id: { type: 'string' },
        game_title: { type: 'string' },
        tier: { type: 'integer' },
      },
    }
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          to: 'user.id',
          through: {
            to: 'user_achievement.user_id',
            from: 'user_achievement.achievement_id',
          },
          from: 'achievement.id',
        },
      },
      rewards: {
        relation: Model.ManyToManyRelation,
        modelClass: Reward,
        join: {
          to: 'reward.id',
          through: {
            to: 'achievement_reward.reward_id',
            from: 'achievement_reward.achievement_id',
          },
          from: 'achievement.id',
        },
      },
    }
  }
}
