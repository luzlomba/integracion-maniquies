import { useState, useEffect } from 'react'

function PiezaForm({ tipo, piezaEditar, onClose, onSave, materiales, colores, modelosPieza, modelosExtremidad }) {
  const [formData, setFormData] = useState({
    nro_serie: '',
    fecha_fabricacion: new Date().toISOString().split('T')[0],
    id_color: '',
    id_material: '',
    talle: '',
    lado: '',
    tipo: tipo || 'cabeza'
  })

  const [genero, setGenero] = useState('unisex')
  const [loading, setLoading] = useState(false)

  // Cargar datos si estamos editando
  useEffect(() => {
    if (piezaEditar) {
      const modelo = piezaEditar.modelo
      setFormData({
        nro_serie: piezaEditar.nro_serie || '',
        fecha_fabricacion: piezaEditar.fecha_fabricacion ? 
          new Date(piezaEditar.fecha_fabricacion).toISOString().split('T')[0] : 
          new Date().toISOString().split('T')[0],
        id_color: modelo?.id_color?.toString() || '',
        id_material: modelo?.id_material?.toString() || '',
        talle: modelo?.talle || '',
        lado: modelo?.lado || '',
        tipo: piezaEditar.tipo || tipo
      })
      if (modelo?.genero) setGenero(modelo.genero)
    } else {
      generarNumeroSerie(tipo || 'cabeza')
    }
  }, [piezaEditar, tipo])

  const generarNumeroSerie = (tipoPieza) => {
    const prefijos = { cabeza: 'CAB', torso: 'TOR', brazo: 'BRA', pierna: 'PIE' }
    const prefijo = prefijos[tipoPieza] || 'PIE'
    const numero = String(Math.floor(Math.random() * 900) + 100)
    setFormData(prev => ({ ...prev, nro_serie: `${prefijo}-${numero}`, tipo: tipoPieza }))
  }

  const esExtremidad = formData.tipo === 'brazo' || formData.tipo === 'pierna'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTipoChange = (e) => {
    const nuevoTipo = e.target.value
    setFormData(prev => ({ ...prev, tipo: nuevoTipo }))
    generarNumeroSerie(nuevoTipo)
  }

    const handleSubmit = async (e) => {
  e.preventDefault()
  if (!formData.id_color || !formData.id_material || !formData.fecha_fabricacion) {
    alert('Por favor completá todos los campos obligatorios')
    return
  }

  if (esExtremidad && !formData.lado) {
    alert('Por favor seleccioná el lado (izquierdo/derecho)')
    return
  }

  setLoading(true)

  try {
    // Enviar TODOS los datos al App.jsx (incluyendo color, material, talle, género, lado)
    // El App.jsx se encargará de buscar/crear el modelo automáticamente
    const datosParaEnviar = {
      nro_serie: formData.nro_serie,
      fecha_fabricacion: formData.fecha_fabricacion,
      tipo: formData.tipo,
      id_color: parseInt(formData.id_color),
      id_material: parseInt(formData.id_material),
      talle: formData.talle || 'M',
      genero: genero,
      lado: formData.lado
    }

    await onSave(datosParaEnviar)
  } catch (error) {
    console.error('Error:', error)
    alert('Error al guardar la pieza')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{piezaEditar ? 'Editar Pieza' : 'Nueva Pieza'}</h2>
        
        <form onSubmit={handleSubmit} className="pieza-form">
          <div className="form-group">
            <label>Tipo de Pieza:</label>
            <select name="tipo" value={formData.tipo} onChange={handleTipoChange} disabled={!!piezaEditar} className="input-field">
              <option value="cabeza">Cabeza</option>
              <option value="torso">Torso</option>
              <option value="brazo">Brazo</option>
              <option value="pierna">Pierna</option>
            </select>
          </div>

          <div className="form-group">
            <label>N° Serie:</label>
            <input type="text" name="nro_serie" value={formData.nro_serie} className="input-field" readOnly />
            <small className="form-hint">Se genera automáticamente</small>
          </div>

          <div className="form-group">
            <label>Fecha de Fabricación: *</label>
            <input type="date" name="fecha_fabricacion" value={formData.fecha_fabricacion} onChange={handleChange} className="input-field" required />
          </div>

          <div className="form-group">
            <label>Color: *</label>
            <select name="id_color" value={formData.id_color} onChange={handleChange} className="input-field" required>
              <option value="">Seleccionar color...</option>
              {colores.map(c => <option key={c.id_color} value={c.id_color}>{c.nombre}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Material: *</label>
            <select name="id_material" value={formData.id_material} onChange={handleChange} className="input-field" required>
              <option value="">Seleccionar material...</option>
              {materiales.map(m => <option key={m.id_material} value={m.id_material}>{m.nombre}</option>)}
            </select>
          </div>

          {!esExtremidad && (
            <>
              <div className="form-group">
                <label>Talle:</label>
                <select name="talle" value={formData.talle} onChange={handleChange} className="input-field">
                  <option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option>
                </select>
              </div>
              <div className="form-group">
                <label>Género:</label>
                <select value={genero} onChange={(e) => setGenero(e.target.value)} className="input-field">
                  <option value="unisex">Unisex</option><option value="masculino">Masculino</option><option value="femenino">Femenino</option>
                </select>
              </div>
            </>
          )}

          {esExtremidad && (
            <div className="form-group">
              <label>Lado: *</label>
              <select name="lado" value={formData.lado} onChange={handleChange} className="input-field" required>
                <option value="">Seleccionar lado...</option>
                <option value="izquierdo">Izquierdo</option><option value="derecho">Derecho</option>
              </select>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel" disabled={loading}>Cancelar</button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Guardando...' : (piezaEditar ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PiezaForm