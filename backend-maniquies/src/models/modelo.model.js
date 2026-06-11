import connection from '../db/dbConnect.js'

const getTable = (tipo) => tipo === 'modelosPieza' ? 'modelo_pieza' : 'modelo_extremidad'

export const findAll = async (tipo) => {
  const [rows] = await connection.query(`SELECT * FROM ${getTable(tipo)}`)
  return rows
}

export const findById = async (tipo, id) => {
  const [rows] = await connection.query(
    `SELECT * FROM ${getTable(tipo)} WHERE id_modelo = ?`,
    [id]
  )
  return rows[0] || null
}

export const create = async (tipo, data) => {
  if (tipo === 'modelosPieza') {
    const { tipo: tipoPieza, genero, talle, id_material, id_color } = data
    const [result] = await connection.execute(
      `INSERT INTO modelo_pieza (tipo, genero, talle, id_material, id_color) VALUES (?, ?, ?, ?, ?)`,
      [tipoPieza, genero, talle, id_material, id_color]
    )
    return findById(tipo, result.insertId)
  } else {
    const { tipo: tipoExt, lado, id_material, id_color } = data
    const [result] = await connection.execute(
      `INSERT INTO modelo_extremidad (tipo, lado, id_material, id_color) VALUES (?, ?, ?, ?)`,
      [tipoExt, lado, id_material, id_color]
    )
    return findById(tipo, result.insertId)
  }
}

export const update = async (tipo, id, data) => {
  if (tipo === 'modelosPieza') {
    const { tipo: tipoPieza, genero, talle, id_material, id_color } = data
    await connection.execute(
      `UPDATE modelo_pieza SET tipo = ?, genero = ?, talle = ?, id_material = ?, id_color = ? WHERE id_modelo = ?`,
      [tipoPieza, genero, talle, id_material, id_color, id]
    )
  } else {
    const { tipo: tipoExt, lado, id_material, id_color } = data
    await connection.execute(
      `UPDATE modelo_extremidad SET tipo = ?, lado = ?, id_material = ?, id_color = ? WHERE id_modelo = ?`,
      [tipoExt, lado, id_material, id_color, id]
    )
  }
  return findById(tipo, id)
}

export const deleteElement = async (tipo, id) => {
  const item = await findById(tipo, id)
  if (!item) return null
  await connection.execute(
    `DELETE FROM ${getTable(tipo)} WHERE id_modelo = ?`,
    [id]
  )
  return item
}