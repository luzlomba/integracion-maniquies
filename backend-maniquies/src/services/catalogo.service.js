import { findAll, findById, create, update, deleteElement } from '../models/catalogo.model.js'

const getAllItems = async (tipo) => findAll(tipo)

const getItemById = async (tipo, id) => {
  const item = await findById(tipo, id)
  if (!item) throw new Error(`${tipo} no encontrado`)
  return item
}

const createItem = async (tipo, data) => create(tipo, data)

const updateItem = async (tipo, id, data) => {
  const item = await findById(tipo, id)
  if (!item) throw new Error(`${tipo} no encontrado`)
  return update(tipo, id, data)
}

const deleteItem = async (tipo, id) => {
  const deleted = await deleteElement(tipo, id)
  if (!deleted) throw new Error(`${tipo} no encontrado`)
  return deleted
}

export default { getAllItems, getItemById, createItem, updateItem, deleteItem }