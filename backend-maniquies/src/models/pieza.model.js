import connection from '../db/dbConnect.js'

const getTable = (tipo) => tipo.slice(0, -1)
const getIdKey = (tipo) => `id_${tipo.slice(0, -1)}`

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
  const { nro_serie, fecha_fabricacion, id_modelo } = data
  const [result] = await connection.execute(
    `INSERT INTO ${getTable(tipo)} (tipo, nro_serie, fecha_fabricacion, id_modelo) VALUES (?, ?, ?, ?)`,
    [tipo.slice(0, -1), nro_serie, fecha_fabricacion, id_modelo]
  )
  return findById(tipo, result.insertId)
}

export const update = async (tipo, id, data) => {
  const { nro_serie, fecha_fabricacion, id_modelo } = data
  await connection.execute(
    `UPDATE ${getTable(tipo)} SET nro_serie = ?, fecha_fabricacion = ?, id_modelo = ? WHERE ${getIdKey(tipo)} = ?`,
    [nro_serie, fecha_fabricacion, id_modelo, id]
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