import { Model } from './Model'

export class User extends Model {
  static get tableName() {
    return 'user'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'string' },
        display_name: { type: 'string', minLength: 1, maxLength: 255 },
        avatar_url: { type: 'string', minLength: 1, maxLength: 255 },
        points: { type: 'integer' },
      },
    }
  }
}
