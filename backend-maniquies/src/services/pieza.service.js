import { findAll, findById, create, update, deleteElement } from '../models/pieza.model.js'
import connection from '../db/dbConnect.js'

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

// Función auxiliar para verificar si una pieza está en uso
const verificarSiEstaEnUso = async (tipo, id) => {
  let query = ''
  
  switch(tipo) {
    case 'cabezas':
      query = 'SELECT COUNT(*) as count FROM maniqui WHERE id_cabeza = ?'
      break
    case 'torsos':
      query = 'SELECT COUNT(*) as count FROM maniqui WHERE id_torso = ?'
      break
    case 'brazos':
      query = 'SELECT COUNT(*) as count FROM maniqui WHERE id_brazo_izq = ? OR id_brazo_der = ?'
      break
    case 'piernas':
      query = 'SELECT COUNT(*) as count FROM maniqui WHERE id_pierna_izq = ? OR id_pierna_der = ?'
      break
    default:
      return false
  }
  
  const params = tipo === 'brazos' || tipo === 'piernas' ? [id, id] : [id]
  const [rows] = await connection.query(query, params)
  
  return rows[0].count > 0
}

const deletePieza = async (tipo, id) => {
  const pieza = await findById(tipo, id)
  if (!pieza) throw new Error('Pieza no encontrada')
  
  // Valida si la pieza está en uso
  const estaEnUso = await verificarSiEstaEnUso(tipo, id)
  if (estaEnUso) {
    throw new Error('No se puede eliminar la pieza porque está siendo usada por un maniquí')
  }
  
  return deleteElement(tipo, id)
}

export default { getAllPiezas, getPiezaById, createPieza, updatePieza, deletePieza }