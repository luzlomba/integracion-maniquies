import { useState } from 'react'

function Colors({ colors, setColors }) {
  const [newColorName, setNewColorName] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newColorName.trim()) return
    setColors([...colors, { id_color: Date.now(), nombre: newColorName }])
    setNewColorName('')
  }

  const handleDelete = (id) => {
    setColors(colors.filter(c => c.id_color !== id))
  }

  return (
    <div className="view-container">
      <h2>Manage Colors</h2>
      
      <form onSubmit={handleAdd} className="filters filters-left">
        <input 
          className="input-field"
          value={newColorName}
          onChange={(e) => setNewColorName(e.target.value)}
          placeholder="Ingresar Nombre del Color"
        />
        <button type="submit" className="btn-action btn-edit no-margin"> Agregar Color </button>
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
          {colors.map(c => (
            <tr key={c.id_color}>
              <td>{c.id_color}</td>
              <td>{c.nombre}</td>
              <td>
                <button 
                  onClick={() => handleDelete(c.id_color)}
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

export default Colors