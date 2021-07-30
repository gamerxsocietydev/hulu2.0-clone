import { Model } from './Model'

export class Supplier extends Model {
  static get tableName() {
    return 'supplier'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'string' },
        display_name: { type: 'string', minLength: 1, maxLength: 255 },
        logo_url: { type: 'string', minLength: 1, maxLength: 255 },
      },
    }
  }
}
