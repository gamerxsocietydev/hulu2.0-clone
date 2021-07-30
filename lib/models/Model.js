import { Model as ObjectionModel } from 'objection'
import { getKnex } from '../knex'

ObjectionModel.knex(getKnex())

export class Model extends ObjectionModel {
  static get modelPaths() {
    // Note: process.cwd() is more reliable than __dirname in bundled environments
    return [`${process.cwd()}/lib/models`]
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString()
  }
}
