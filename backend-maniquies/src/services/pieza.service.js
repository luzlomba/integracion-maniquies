import { findAll, findById, create, update, deleteElement } from '../models/pieza.model.js'

const getAllPiezas = async (tipo) => findAll(tipo)

const getPiezaById = async (tipo, id) => {
  const pieza = await findById(tipo, id)
  if (!pieza) throw new Error('Pieza no encontrada')
  return pieza
}

const createPieza = async (tipo, data) => create(tipo, data)

const updatePieza = async (tipo, id, data) => {
  const pieza = await findById(tipo, id)
  if (!pieza) throw new Error('Pieza no encontrada')
  return update(tipo, id, data)
}

const deletePieza = async (tipo, id) => {
  const deleted = await deleteElement(tipo, id)
  if (!deleted) throw new Error('Pieza no encontrada')
  return deleted
}

export default { getAllPiezas, getPiezaById, createPieza, updatePieza, deletePieza }