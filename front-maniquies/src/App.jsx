import { useState, useEffect } from 'react'
import PiezasList from './components/PiezasList'
import ManiquiesList from './components/ManiquiesList'
import Sidebar from './components/Sidebar'
import Assembler from './components/Assembler'
import Colors from './components/Colors'
import Materials from './components/Materials'
import Dashboard from './components/Dashboard'
import PiezaForm from './components/PiezaForm'
import './App.css'
import { maniquiAPI, piezaAPI, catalogoAPI, modelosAPI } from './api'

function App() {
  const [filter, setFilter] = useState('todas')
  const [view, setView] = useState('inicio')
  
  const [maniquies, setManiquies] = useState([])
  const [cabezas, setCabezas] = useState([])
  const [torsos, setTorsos] = useState([])
  const [brazos, setBrazos] = useState([])
  const [piernas, setPiernas] = useState([])
  const [materiales, setMateriales] = useState([])
  const [colores, setColores] = useState([])
  const [modelosPieza, setModelosPieza] = useState([])
  const [modelosExtremidad, setModelosExtremidad] = useState([])
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [showPiezaForm, setShowPiezaForm] = useState(false)
  const [piezaEditar, setPiezaEditar] = useState(null)
  const [tipoPieza, setTipoPieza] = useState('cabeza')

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [
          maniquiesData, cabezasData, torsosData, brazosData, piernasData,
          materialesData, coloresData, modelosPiezaData, modelosExtremidadData
        ] = await Promise.all([
          maniquiAPI.getAll(), piezaAPI.getCabezas(), piezaAPI.getTorsos(),
          piezaAPI.getBrazos(), piezaAPI.getPiernas(), catalogoAPI.getMateriales(),
          catalogoAPI.getColores(), modelosAPI.getModelosPieza(), modelosAPI.getModelosExtremidad()
        ])

        setManiquies(maniquiesData)
        setCabezas(cabezasData)
        setTorsos(torsosData)
        setBrazos(brazosData)
        setPiernas(piernasData)
        setMateriales(materialesData)
        setColores(coloresData)
        setModelosPieza(modelosPiezaData)
        setModelosExtremidad(modelosExtremidadData)
        setError(null)
      } catch (err) {
        console.error('Error cargando datos:', err)
        setError('Error al cargar los datos. Verificá que el backend esté corriendo.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const piezasEnUso = {
    cabezas: maniquies.length, torsos: maniquies.length,
    brazos: maniquies.length * 2, piernas: maniquies.length * 2,
  }
  const stockDisponible = {
    cabezas: Math.max(0, cabezas.length - piezasEnUso.cabezas),
    torsos: Math.max(0, torsos.length - piezasEnUso.torsos),
    brazos: Math.max(0, brazos.length - piezasEnUso.brazos),
    piernas: Math.max(0, piernas.length - piezasEnUso.piernas),
  }

  const piezasEnUsoIds = {
    cabezas: new Set(maniquies.map(m => m.id_cabeza)),
    torsos: new Set(maniquies.map(m => m.id_torso)),
    brazos: new Set([...maniquies.map(m => m.id_brazo_izq), ...maniquies.map(m => m.id_brazo_der)]),
    piernas: new Set([...maniquies.map(m => m.id_pierna_izq), ...maniquies.map(m => m.id_pierna_der)])
  }

  const getPieceData = (pieza) => {
    const isExtremity = pieza.tipo === 'brazo' || pieza.tipo === 'pierna'
    const modelos = isExtremity ? modelosExtremidad : modelosPieza
    const modelo = modelos.find(m => m.id_modelo === pieza.id_modelo)
    const material = materiales.find(m => m.id_material === modelo?.id_material)
    const color = colores.find(c => c.id_color === modelo?.id_color)

    let estado = 'Disponible'
    if (pieza.tipo === 'cabeza' && piezasEnUsoIds.cabezas.has(pieza.id_cabeza)) estado = 'En uso'
    else if (pieza.tipo === 'torso' && piezasEnUsoIds.torsos.has(pieza.id_torso)) estado = 'En uso'
    else if (pieza.tipo === 'brazo' && piezasEnUsoIds.brazos.has(pieza.id_brazo)) estado = 'En uso'
    else if (pieza.tipo === 'pierna' && piezasEnUsoIds.piernas.has(pieza.id_pierna)) estado = 'En uso'

    return {
      ...pieza,
      material: material?.nombre,
      color: color?.nombre,
      genero: modelo?.genero || '-',
      estado,
      modelo
    }
  }

  const allPieces = [...cabezas, ...torsos, ...brazos, ...piernas].map(getPieceData)
  const filteredPieces = filter === 'todas' ? allPieces : allPieces.filter(p => p.tipo === filter)

  const handleDeleteManiqui = async (id) => {
    if (window.confirm("¿Desarmar este maniquí?")) {
      try {
        await maniquiAPI.delete(id)
        setManiquies(maniquies.filter(m => m.id_maniqui !== id))
      } catch { alert('Error al eliminar el maniquí') }
    }
  }

  const handleUpdateManiqui = async (maniquiActualizado) => {
    try {
      let fechaFormateada = maniquiActualizado.fecha_ensamblaje
      if (fechaFormateada && (fechaFormateada instanceof Date || typeof fechaFormateada === 'string' && fechaFormateada.includes('T'))) {
        const date = new Date(fechaFormateada)
        fechaFormateada = date.toISOString().split('T')[0]
      }
      const datosParaEnviar = {
        ...maniquiActualizado,
        fecha_ensamblaje: fechaFormateada
      }
      await maniquiAPI.update(maniquiActualizado.id_maniqui, datosParaEnviar)
      setManiquies(maniquies.map(m =>
        m.id_maniqui === maniquiActualizado.id_maniqui ? maniquiActualizado : m
      ))
    } catch (err) {
      console.error('Error actualizando maniquí:', err)
      alert('Error al actualizar el maniquí en la base de datos')
    }
  }

  const handleAssembleManiqui = async (selection) => {
    try {
      const nuevo = await maniquiAPI.create(selection)
      setManiquies([...maniquies, nuevo])
      alert('¡Maniquí ensamblado!')
    } catch { alert('Error al crear') }
  }

  const handleNewPieza = (tipo) => { setTipoPieza(tipo || 'cabeza'); setPiezaEditar(null); setShowPiezaForm(true) }
  const handleEditPieza = (pieza) => { setTipoPieza(pieza.tipo); setPiezaEditar(pieza); setShowPiezaForm(true) }

  const handleDeletePieza = async (pieza) => {
    if (window.confirm(`¿Eliminar ${pieza.tipo} ${pieza.nro_serie}?`)) {
      try {
        const id = pieza.id_cabeza || pieza.id_torso || pieza.id_brazo || pieza.id_pierna
        const tipo = pieza.tipo + 's'
        if (tipo === 'cabezas') { await piezaAPI.deleteCabeza(id); setCabezas(cabezas.filter(p => p.id_cabeza !== id)) }
        else if (tipo === 'torsos') { await piezaAPI.deleteTorso(id); setTorsos(torsos.filter(p => p.id_torso !== id)) }
        else if (tipo === 'brazos') { await piezaAPI.deleteBrazo(id); setBrazos(brazos.filter(p => p.id_brazo !== id)) }
        else if (tipo === 'piernas') { await piezaAPI.deletePierna(id); setPiernas(piernas.filter(p => p.id_pierna !== id)) }
      } catch (err) { alert(err.message || 'Error al eliminar') }
    }
  }

  const handleSavePieza = async (formData) => {
    try {
      const esExtremidad = formData.tipo === 'brazo' || formData.tipo === 'pierna'
      const modelosDisponibles = esExtremidad ? modelosExtremidad : modelosPieza

      let modelo = modelosDisponibles.find(m =>
        m.id_color === formData.id_color &&
        m.id_material === formData.id_material &&
        (esExtremidad
          ? m.lado === formData.lado
          : m.talle === formData.talle && m.genero === formData.genero)
      )

      if (!modelo) {
        const nuevoModeloData = {
          tipo: formData.tipo,
          id_color: formData.id_color,
          id_material: formData.id_material,
          ...(esExtremidad ? { lado: formData.lado } : { talle: formData.talle, genero: formData.genero })
        }

        if (esExtremidad) {
          modelo = await modelosAPI.createModeloExtremidad(nuevoModeloData)
          setModelosExtremidad(prev => [...prev, modelo])
        } else {
          modelo = await modelosAPI.createModeloPieza(nuevoModeloData)
          setModelosPieza(prev => [...prev, modelo])
        }
      }

      const datosParaGuardar = {
        nro_serie: formData.nro_serie,
        fecha_fabricacion: formData.fecha_fabricacion,
        tipo: formData.tipo,
        id_modelo: modelo.id_modelo
      }

      const tipoEndpoint = formData.tipo + 's'

      if (piezaEditar) {
        const id = piezaEditar.id_cabeza || piezaEditar.id_torso || piezaEditar.id_brazo || piezaEditar.id_pierna
        if (tipoEndpoint === 'cabezas') { const r = await piezaAPI.updateCabeza(id, datosParaGuardar); setCabezas(cabezas.map(p => p.id_cabeza === id ? { ...p, ...r } : p)) }
        else if (tipoEndpoint === 'torsos') { const r = await piezaAPI.updateTorso(id, datosParaGuardar); setTorsos(torsos.map(p => p.id_torso === id ? { ...p, ...r } : p)) }
        else if (tipoEndpoint === 'brazos') { const r = await piezaAPI.updateBrazo(id, datosParaGuardar); setBrazos(brazos.map(p => p.id_brazo === id ? { ...p, ...r } : p)) }
        else if (tipoEndpoint === 'piernas') { const r = await piezaAPI.updatePierna(id, datosParaGuardar); setPiernas(piernas.map(p => p.id_pierna === id ? { ...p, ...r } : p)) }
      } else {
        if (tipoEndpoint === 'cabezas') { const r = await piezaAPI.createCabeza(datosParaGuardar); setCabezas([...cabezas, r]) }
        else if (tipoEndpoint === 'torsos') { const r = await piezaAPI.createTorso(datosParaGuardar); setTorsos([...torsos, r]) }
        else if (tipoEndpoint === 'brazos') { const r = await piezaAPI.createBrazo(datosParaGuardar); setBrazos([...brazos, r]) }
        else if (tipoEndpoint === 'piernas') { const r = await piezaAPI.createPierna(datosParaGuardar); setPiernas([...piernas, r]) }
      }

      setShowPiezaForm(false)
      setPiezaEditar(null)
    } catch (err) {
      console.error('Error guardando pieza:', err)
      alert('Error al guardar la pieza en la base de datos')
    }
  }

  if (loading) return <div className="layout"><Sidebar setView={setView} /><main className="content"><h1>Cargando...</h1></main></div>
  if (error) return <div className="layout"><Sidebar setView={setView} /><main className="content"><h1 style={{color:'red'}}>{error}</h1></main></div>

  return (
    <div className="layout">
      <Sidebar setView={setView} />
      <main className="content">
        <h1>Fábrica de Maniquíes</h1>

        {view === 'piezas' && (
          <>
            <div className="filters">
              <button className={filter === 'todas' ? 'active' : ''} onClick={() => setFilter('todas')}>Todas</button>
              <button className={filter === 'cabeza' ? 'active' : ''} onClick={() => setFilter('cabeza')}>Cabezas</button>
              <button className={filter === 'torso' ? 'active' : ''} onClick={() => setFilter('torso')}>Torsos</button>
              <button className={filter === 'brazo' ? 'active' : ''} onClick={() => setFilter('brazo')}>Brazos</button>
              <button className={filter === 'pierna' ? 'active' : ''} onClick={() => setFilter('pierna')}>Piernas</button>
            </div>
            <PiezasList
              piezas={filteredPieces}
              onNewPiece={() => handleNewPieza(filter === 'todas' ? 'cabeza' : filter)}
              onEditPiece={handleEditPieza}
              onDeletePiece={handleDeletePieza}
            />
          </>
        )}

        {view === 'maniquies' && (
          <ManiquiesList
            maniquies={maniquies}
            cabezas={cabezas}
            torsos={torsos}
            brazos={brazos}
            piernas={piernas}
            modelosExtremidad={modelosExtremidad}
            onDelete={handleDeleteManiqui}
            onUpdate={handleUpdateManiqui}
          />
        )}

        {view === 'ensamblador' && (
          <Assembler
            stockDisponible={stockDisponible}
            cabezas={cabezas}
            torsos={torsos}
            brazos={brazos}
            piernas={piernas}
            modelosPieza={modelosPieza}
            modelosExtremidad={modelosExtremidad}
            materiales={materiales}
            colores={colores}
            maniquies={maniquies}
            setManiquies={setManiquies}
            onAssemble={handleAssembleManiqui}
          />
        )}

        {view === 'inicio' && 
          <Dashboard 
            maniquies={maniquies} 
            stockDisponible={stockDisponible} 
            />
        }
        
        {view === 'colores' && 
          <Colors 
            colors={colores} 
            setColors={setColores} 
            />
        }

        {view === 'materiales' &&
          <Materials materials={materiales} 
            setMaterials={setMateriales} 
          />
        }
      </main>

      {showPiezaForm && (
        <PiezaForm
        tipo={tipoPieza}
        piezaEditar={piezaEditar}
        onClose={() => setShowPiezaForm(false)}
        onSave={handleSavePieza}
        materiales={materiales}
        colores={colores}
        modelosPieza={modelosPieza}
        modelosExtremidad={modelosExtremidad}
        cabezas={cabezas}
        torsos={torsos}
        brazos={brazos}
        piernas={piernas}
      />
      )}
    </div>
  )
}

export default App