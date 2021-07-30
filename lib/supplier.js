import { v4 as uuidv4 } from 'uuid'
import { Supplier } from './models/Supplier'

export async function getAllSuppliers() {
  return Supplier.query()
}

export async function createSupplier(attributes, trx = undefined) {
  const data = {
    ...attributes,
    id: uuidv4(),
  }
  return Supplier.query(trx).insertAndFetch(data)
}

export async function findSupplierById(id) {
  return Supplier.query().findById(id).skipUndefined()
}

export async function updateSupplierById(
  id,
  { display_name, logo_url },
  trx = undefined
) {
  return Supplier.query(trx).updateAndFetchById(id, { display_name, logo_url })
}
