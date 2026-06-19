import { useState } from 'react'
import { catalogoAPI } from '../api.js'

function Materials({ materials, setMaterials, showNotification }) {
  const [newMaterialName, setNewMaterialName] = useState('')

  const handleAdd = async (e) => {
    e.preventDefault()

    if (!newMaterialName.trim()) return

    try {
      const nuevoMaterial = await catalogoAPI.createMaterial({
        nombre: newMaterialName
      })

      setMaterials([...materials, nuevoMaterial])
      setNewMaterialName('')
    } catch (err) {
      console.error(err)
      showNotification('Error al crear material')
    }
  }

  const handleDelete = async (id) => {
    try {
      await catalogoAPI.deleteMaterial(id)
      setMaterials(materials.filter(m => m.id_material !== id))
    } catch (err) {
      console.error(err)
      showNotification ('Error al eliminar material')
    }
}

  return (
    <div className="view-container">
      <h2>Manage Materials</h2>
      
      <form onSubmit={handleAdd} className="filters filters-left">
        <input 
          className="input-field"
          value={newMaterialName}
          onChange={(e) => setNewMaterialName(e.target.value)}
          placeholder="Ingresar Nombre del Material"
        />
        <button type="submit" className="assemble-btn">Agregar Material</button>
      </form>

      <table className="table-container">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(m => (
            <tr key={m.id_material}>
              <td>{m.id_material}</td>
              <td>{m.nombre}</td>
              <td>
                <button 
                  onClick={() => handleDelete(m.id_material)}
                  className="btn-action btn-delete"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Materials