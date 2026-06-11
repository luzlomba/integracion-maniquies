import { useState } from 'react'

function Materials({ materials, setMaterials }) {
  const [newMaterialName, setNewMaterialName] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newMaterialName.trim()) return
    setMaterials([...materials, { id_material: Date.now(), nombre: newMaterialName }])
    setNewMaterialName('')
  }

  const handleDelete = (id) => {
    setMaterials(materials.filter(m => m.id_material !== id))
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