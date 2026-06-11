import connection from '../db/dbConnect.js'

const getTable = (tipo) => tipo === 'materiales' ? 'material' : 'color'
const getIdKey = (tipo) => tipo === 'materiales' ? 'id_material' : 'id_color'

export const findAll = async (tipo) => {
  const [rows] = await connection.query(`SELECT * FROM ${getTable(tipo)}`)
  return rows
}

export const findById = async (tipo, id) => {
  const [rows] = await connection.query(
    `SELECT * FROM ${getTable(tipo)} WHERE ${getIdKey(tipo)} = ?`,
    [id]
  )
  return rows[0] || null
}

export const create = async (tipo, data) => {
  const [result] = await connection.execute(
    `INSERT INTO ${getTable(tipo)} (nombre) VALUES (?)`,
    [data.nombre]
  )
  return { [getIdKey(tipo)]: result.insertId, ...data }
}

export const update = async (tipo, id, data) => {
  await connection.execute(
    `UPDATE ${getTable(tipo)} SET nombre = ? WHERE ${getIdKey(tipo)} = ?`,
    [data.nombre, id]
  )
  return findById(tipo, id)
}

export const deleteElement = async (tipo, id) => {
  const item = await findById(tipo, id)
  if (!item) return null
  await connection.execute(
    `DELETE FROM ${getTable(tipo)} WHERE ${getIdKey(tipo)} = ?`,
    [id]
  )
  return item
}