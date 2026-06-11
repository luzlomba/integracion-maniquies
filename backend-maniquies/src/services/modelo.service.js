import { findAll, findById, create, update, deleteElement } from '../models/modelo.model.js'

const getAllModelos = async (tipo) => findAll(tipo)

const getModeloById = async (tipo, id) => {
  const modelo = await findById(tipo, id)
  if (!modelo) throw new Error('Modelo no encontrado')
  return modelo
}

const createModelo = async (tipo, data) => create(tipo, data)

const updateModelo = async (tipo, id, data) => {
  const modelo = await findById(tipo, id)
  if (!modelo) throw new Error('Modelo no encontrado')
  return update(tipo, id, data)
}

const deleteModelo = async (tipo, id) => {
  const deleted = await deleteElement(tipo, id)
  if (!deleted) throw new Error('Modelo no encontrado')
  return deleted
}

export default { getAllModelos, getModeloById, createModelo, updateModelo, deleteModelo }