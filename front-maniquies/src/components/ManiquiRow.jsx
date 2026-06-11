import { useState } from 'react'

function ManiquiRow({ maniqui, maniquies, cabezas, torsos, brazos, piernas, modelosExtremidad, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ ...maniqui })

  const cabezasDisponibles = cabezas.filter(c => 
    c.id_cabeza === maniqui.id_cabeza || !maniquies.some(m => m.id_cabeza === c.id_cabeza)
  )

  const torsosDisponibles = torsos.filter(t => 
    t.id_torso === maniqui.id_torso || !maniquies.some(m => m.id_torso === t.id_torso)
  )

  const brazosIzqDisponibles = brazos.filter(b => {
    const mod = modelosExtremidad.find(m => m.id_modelo === b.id_modelo)
    if (mod?.lado?.toLowerCase() !== 'izquierdo') return false
    return b.id_brazo === maniqui.id_brazo_izq || !maniquies.some(m => m.id_brazo_izq === b.id_brazo)
  })

  const brazosDerDisponibles = brazos.filter(b => {
    const mod = modelosExtremidad.find(m => m.id_modelo === b.id_modelo)
    if (mod?.lado?.toLowerCase() !== 'derecho') return false
    return b.id_brazo === maniqui.id_brazo_der || !maniquies.some(m => m.id_brazo_der === b.id_brazo)
  })

  const piernasIzqDisponibles = piernas.filter(p => {
    const mod = modelosExtremidad.find(m => m.id_modelo === p.id_modelo)
    if (mod?.lado?.toLowerCase() !== 'izquierdo') return false
    return p.id_pierna === maniqui.id_pierna_izq || !maniquies.some(m => m.id_pierna_izq === p.id_pierna)
  })

  const piernasDerDisponibles = piernas.filter(p => {
    const mod = modelosExtremidad.find(m => m.id_modelo === p.id_modelo)
    if (mod?.lado?.toLowerCase() !== 'derecho') return false
    return p.id_pierna === maniqui.id_pierna_der || !maniquies.some(m => m.id_pierna_der === p.id_pierna)
  })

  const handleSelectChange = (campo, valor) => {
    setEditForm({ ...editForm, [campo]: Number(valor) })
  }

  const handleSave = () => {
    onUpdate(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({ ...maniqui })
    setIsEditing(false)
  }

  const cabezaActual = cabezas.find(c => c.id_cabeza === maniqui.id_cabeza)
  const torsoActual = torsos.find(t => t.id_torso === maniqui.id_torso)
  const brazoIzqActual = brazos.find(b => b.id_brazo === maniqui.id_brazo_izq)
  const brazoDerActual = brazos.find(b => b.id_brazo === maniqui.id_brazo_der)
  const piernaIzqActual = piernas.find(p => p.id_pierna === maniqui.id_pierna_izq)
  const piernaDerActual = piernas.find(p => p.id_pierna === maniqui.id_pierna_der)

  return (
    <tr>
      <td>{maniqui.codigo}</td>
      <td>{maniqui.fecha_ensamblaje}</td>

      {isEditing ? (
        <>
          <td>
            <select value={editForm.id_cabeza} onChange={(e) => handleSelectChange('id_cabeza', e.target.value)}>
              {cabezasDisponibles.map(c => <option key={c.id_cabeza} value={c.id_cabeza}>{c.nro_serie}</option>)}
            </select>
          </td>
          <td>
            <select value={editForm.id_torso} onChange={(e) => handleSelectChange('id_torso', e.target.value)}>
              {torsosDisponibles.map(t => <option key={t.id_torso} value={t.id_torso}>{t.nro_serie}</option>)}
            </select>
          </td>
          <td>
            <select value={editForm.id_brazo_izq} onChange={(e) => handleSelectChange('id_brazo_izq', e.target.value)}>
              {brazosIzqDisponibles.map(b => <option key={b.id_brazo} value={b.id_brazo}>{b.nro_serie}</option>)}
            </select>
          </td>
          <td>
            <select value={editForm.id_brazo_der} onChange={(e) => handleSelectChange('id_brazo_der', e.target.value)}>
              {brazosDerDisponibles.map(b => <option key={b.id_brazo} value={b.id_brazo}>{b.nro_serie}</option>)}
            </select>
          </td>
          <td>
            <select value={editForm.id_pierna_izq} onChange={(e) => handleSelectChange('id_pierna_izq', e.target.value)}>
              {piernasIzqDisponibles.map(p => <option key={p.id_pierna} value={p.id_pierna}>{p.nro_serie}</option>)}
            </select>
          </td>
          <td>
            <select value={editForm.id_pierna_der} onChange={(e) => handleSelectChange('id_pierna_der', e.target.value)}>
              {piernasDerDisponibles.map(p => <option key={p.id_pierna} value={p.id_pierna}>{p.nro_serie}</option>)}
            </select>
          </td>
          <td>
            <button onClick={handleSave} className="btn-save">Guardar</button>
            <button onClick={handleCancel} className="btn-cancel">Cancelar</button>
          </td>
        </>
      ) : (
        <>
          <td>{cabezaActual?.nro_serie || '-'}</td>
          <td>{torsoActual?.nro_serie || '-'}</td>
          <td>{brazoIzqActual?.nro_serie || '-'}</td>
          <td>{brazoDerActual?.nro_serie || '-'}</td>
          <td>{piernaIzqActual?.nro_serie || '-'}</td>
          <td>{piernaDerActual?.nro_serie || '-'}</td>
          <td>
            <button onClick={() => setIsEditing(true)} className="btn-action btn-edit">Editar</button>
            <button onClick={() => onDelete(maniqui.id_maniqui)} className="btn-action btn-delete">Desensamblar</button>
          </td>
        </>
      )}
    </tr>
  )
}

export default ManiquiRow