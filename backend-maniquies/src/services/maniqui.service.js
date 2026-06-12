import { findAll, findById, create, update, deleteElement } from '../models/maniqui.model.js'
import { findById as findPieza } from '../models/pieza.model.js'

const getAllManiquies = async () => findAll()

const getManiquiById = async (id) => {
  const maniqui = await findById(id)
  if (!maniqui) throw new Error('Maniquí no encontrado')
  return maniqui
}

const createManiqui = async (data) => {
  // Validar que existan todas las piezas (Lógica de negocio)
  const cabeza = await findPieza('cabezas', data.id_cabeza)
  if (!cabeza) throw new Error('Cabeza no encontrada')
  const torso = await findPieza('torsos', data.id_torso)
  if (!torso) throw new Error('Torso no encontrado')
  const brazoIzq = await findPieza('brazos', data.id_brazo_izq)
  if (!brazoIzq) throw new Error('Brazo izquierdo no encontrado')
  const brazoDer = await findPieza('brazos', data.id_brazo_der)
  if (!brazoDer) throw new Error('Brazo derecho no encontrado')
  const piernaIzq = await findPieza('piernas', data.id_pierna_izq)
  if (!piernaIzq) throw new Error('Pierna izquierda no encontrada')
  const piernaDer = await findPieza('piernas', data.id_pierna_der)
  if (!piernaDer) throw new Error('Pierna derecha no encontrada')

  // Delegar la creación (y la generación del código) al modelo
  return create(data)
}

const updateManiqui = async (id, data) => {
  const maniqui = await findById(id)
  if (!maniqui) throw new Error('Maniquí no encontrado')
  return update(id, data)
}

const deleteManiqui = async (id) => {
  const deleted = await deleteElement(id)
  if (!deleted) throw new Error('Maniquí no encontrado')
  return deleted
}

export default { getAllManiquies, getManiquiById, createManiqui, updateManiqui, deleteManiqui }