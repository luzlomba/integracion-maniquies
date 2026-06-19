import connection from '../db/dbConnect.js'

const getTableInfo = (tipo) => {
  const map = {
    'cabezas': { table: 'cabeza', idField: 'id_cabeza' },
    'torsos': { table: 'torso', idField: 'id_torso' },
    'brazos': { table: 'brazo', idField: 'id_brazo' },
    'piernas': { table: 'pierna', idField: 'id_pierna' }
  }
  return map[tipo]
}

export const findAll = async (tipo) => {
  const { table } = getTableInfo(tipo)
  const [rows] = await connection.query(`SELECT * FROM ${table}`)
  return rows
}

export const findById = async (tipo, id) => {
  const { table, idField } = getTableInfo(tipo)
  const [rows] = await connection.query(`SELECT * FROM ${table} WHERE ${idField} = ?`, [id])
  return rows[0] || null
}

export const create = async (tipo, data) => {
  const { table, idField } = getTableInfo(tipo)
  
  const [result] = await connection.execute(
    `INSERT INTO ${table} (tipo, nro_serie, fecha_fabricacion, id_modelo) 
     VALUES (?, ?, ?, ?)`,
    [data.tipo, data.nro_serie, data.fecha_fabricacion, data.id_modelo]
  )
  
  return findById(tipo, result.insertId)
}

export const update = async (tipo, id, data) => {
  const { table, idField } = getTableInfo(tipo)
  
  await connection.execute(
    `UPDATE ${table} 
     SET nro_serie = ?, fecha_fabricacion = ?, id_modelo = ? 
     WHERE ${idField} = ?`,
    [data.nro_serie, data.fecha_fabricacion, data.id_modelo, id]
  )
  
  return findById(tipo, id)
}

export const deleteElement = async (tipo, id) => {
  const { table, idField } = getTableInfo(tipo)
  
  const item = await findById(tipo, id)
  if (!item) return null
  
  await connection.execute(`DELETE FROM ${table} WHERE ${idField} = ?`, [id])
  return item
}