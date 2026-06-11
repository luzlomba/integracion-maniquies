import { useState } from 'react'

function Assembler({ stockDisponible, cabezas, torsos, brazos, piernas, modelosPieza, modelosExtremidad, materiales, colores, maniquies, setManiquies }) {
  const [selection, setSelection] = useState({
    id_cabeza: null, id_torso: null, id_brazo_izq: null, id_brazo_der: null, id_pierna_izq: null, id_pierna_der: null
  })
  const [openSection, setOpenSection] = useState(null)
  
  // Estados para los filtros
  const [filterColor, setFilterColor] = useState('todos')
  const [filterMaterial, setFilterMaterial] = useState('todos')

  const handleSelect = (tipo, id) => {
    setSelection(prev => ({ ...prev, [tipo]: prev[tipo] === id ? null : id }))
  }

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  // Lógica de filtrado por atributos
  const filterByAttributes = (lista) => {
    return lista.filter(p => {
      // Obtenemos el modelo de la pieza (según si es extremidad o pieza principal)
      const modelo = modelosPieza.find(m => m.id_modelo === p.id_modelo) || 
                     modelosExtremidad.find(m => m.id_modelo === p.id_modelo);
      
      const matchColor = filterColor === 'todos' || modelo?.id_color === parseInt(filterColor);
      const matchMaterial = filterMaterial === 'todos' || modelo?.id_material === parseInt(filterMaterial);
      
      return matchColor && matchMaterial;
    });
  };

  const enUsoIds = {
    cabeza: maniquies.map(m => m.id_cabeza),
    torso: maniquies.map(m => m.id_torso),
    brazo: [...maniquies.map(m => m.id_brazo_izq), ...maniquies.map(m => m.id_brazo_der)],
    pierna: [...maniquies.map(m => m.id_pierna_izq), ...maniquies.map(m => m.id_pierna_der)]
  }

  const disp = {
    cabezas: cabezas.filter(p => !enUsoIds.cabeza.includes(p.id_cabeza)),
    torsos: torsos.filter(p => !enUsoIds.torso.includes(p.id_torso)),
    brazosIzq: brazos.filter(p => !enUsoIds.brazo.includes(p.id_brazo) && modelosExtremidad.find(m => m.id_modelo === p.id_modelo)?.lado === 'izquierdo'),
    brazosDer: brazos.filter(p => !enUsoIds.brazo.includes(p.id_brazo) && modelosExtremidad.find(m => m.id_modelo === p.id_modelo)?.lado === 'derecho'),
    piernasIzq: piernas.filter(p => !enUsoIds.pierna.includes(p.id_pierna) && modelosExtremidad.find(m => m.id_modelo === p.id_modelo)?.lado === 'izquierdo'),
    piernasDer: piernas.filter(p => !enUsoIds.pierna.includes(p.id_pierna) && modelosExtremidad.find(m => m.id_modelo === p.id_modelo)?.lado === 'derecho')
  }

  const getSer = (lista, id, field) => lista.find(p => p[field] === id)?.nro_serie || '-'

  const handleAssemble = () => {
    if (Object.values(selection).includes(null)) return alert('Debés completar todas las piezas')
    setManiquies([...maniquies, { id_maniqui: Date.now(), ...selection }])
    setSelection({ id_cabeza: null, id_torso: null, id_brazo_izq: null, id_brazo_der: null, id_pierna_izq: null, id_pierna_der: null })
  }

  return (
    <div className="assembler">
      <h2>Ensamblador</h2>
      
      {/* Filtros */}
      <div className="filters">
        <select onChange={(e) => setFilterColor(e.target.value)}>
          <option value="todos">Todos los colores</option>
          {colores.map(c => <option key={c.id_color} value={c.id_color}>{c.nombre}</option>)}
        </select>
        <select onChange={(e) => setFilterMaterial(e.target.value)}>
          <option value="todos">Todos los materiales</option>
          {materiales.map(m => <option key={m.id_material} value={m.id_material}>{m.nombre}</option>)}
        </select>
      </div>

      <div className="assembler-layout">
        <div className="assembler-left">
          <h3>Piezas disponibles</h3>
          {[
            { id: 'cabezas', title: 'Cabezas', data: disp.cabezas, key: 'id_cabeza', stateKey: 'id_cabeza' },
            { id: 'torsos', title: 'Torsos', data: disp.torsos, key: 'id_torso', stateKey: 'id_torso' },
            { id: 'brazosIzq', title: 'Brazos Izquierdos', data: disp.brazosIzq, key: 'id_brazo', stateKey: 'id_brazo_izq' },
            { id: 'brazosDer', title: 'Brazos Derechos', data: disp.brazosDer, key: 'id_brazo', stateKey: 'id_brazo_der' },
            { id: 'piernasIzq', title: 'Piernas Izquierdas', data: disp.piernasIzq, key: 'id_pierna', stateKey: 'id_pierna_izq' },
            { id: 'piernasDer', title: 'Piernas Derechas', data: disp.piernasDer, key: 'id_pierna', stateKey: 'id_pierna_der' }
          ].map(sec => {
            const dataFiltrada = filterByAttributes(sec.data);
            return (
              <div key={sec.id} className="accordion">
                <div className="accordion-header" onClick={() => toggleSection(sec.id)}>
                  {sec.title} ({dataFiltrada.length}) {openSection === sec.id ? '▲' : '▼'}
                </div>
                {openSection === sec.id && dataFiltrada.map(p => (
                  <div key={p[sec.key]} className={selection[sec.stateKey] === p[sec.key] ? 'piece-option selected' : 'piece-option'} onClick={() => handleSelect(sec.stateKey, p[sec.key])}>
                    {p.nro_serie}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
        
        <div className="assembler-right">
            <h3>Maniquí en construcción</h3>
            <p>Cabeza: {getSer(cabezas, selection.id_cabeza, 'id_cabeza')}</p>
            <p>Torso: {getSer(torsos, selection.id_torso, 'id_torso')}</p>
            <p>Brazo izq: {getSer(brazos, selection.id_brazo_izq, 'id_brazo')}</p>
            <p>Brazo der: {getSer(brazos, selection.id_brazo_der, 'id_brazo')}</p>
            <p>Pierna izq: {getSer(piernas, selection.id_pierna_izq, 'id_pierna')}</p>
            <p>Pierna der: {getSer(piernas, selection.id_pierna_der, 'id_pierna')}</p>
        </div>
      </div>
      <button className="assemble-btn" onClick={handleAssemble}>Ensamblar Maniquí</button>
    </div>
  )
}

export default Assembler