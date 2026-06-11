import connection from '../db/dbConnect.js'

export const findAll = async () => {
  const [rows] = await connection.query('SELECT * FROM maniqui')
  return rows
}

export const findById = async (id) => {
  const [rows] = await connection.query(
    'SELECT * FROM maniqui WHERE id_maniqui = ?',
    [id]
  )
  return rows[0] || null
}

export const create = async (data) => {
  const { codigo, fecha_ensamblaje, id_cabeza, id_torso, id_brazo_izq, id_brazo_der, id_pierna_izq, id_pierna_der } = data
  const [result] = await connection.execute(
    `INSERT INTO maniqui (codigo, fecha_ensamblaje, id_cabeza, id_torso, id_brazo_izq, id_brazo_der, id_pierna_izq, id_pierna_der) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [codigo, fecha_ensamblaje, id_cabeza, id_torso, id_brazo_izq, id_brazo_der, id_pierna_izq, id_pierna_der]
  )
  return findById(result.insertId)
}

export const update = async (id, data) => {
  const { codigo, fecha_ensamblaje, id_cabeza, id_torso, id_brazo_izq, id_brazo_der, id_pierna_izq, id_pierna_der } = data
  await connection.execute(
    `UPDATE maniqui SET codigo = ?, fecha_ensamblaje = ?, id_cabeza = ?, id_torso = ?, id_brazo_izq = ?, id_brazo_der = ?, id_pierna_izq = ?, id_pierna_der = ? 
     WHERE id_maniqui = ?`,
    [codigo, fecha_ensamblaje, id_cabeza, id_torso, id_brazo_izq, id_brazo_der, id_pierna_izq, id_pierna_der, id]
  )
  return findById(id)
}

export const deleteElement = async (id) => {
  const item = await findById(id)
  if (!item) return null
  await connection.execute('DELETE FROM maniqui WHERE id_maniqui = ?', [id])
  return item
}