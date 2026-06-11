import { useState } from 'react'
import PiezasList from './components/PiezasList'
import ManiquiesList from './components/ManiquiesList'
import Sidebar from './components/Sidebar'
import Assembler from './components/Assembler'
import Colors from './components/Colors'
import Materials from './components/Materials'
import Dashboard from './components/Dashboard'
import './App.css'
import { cabezas, torsos, brazos, piernas, modelosPieza, modelosExtremidad, materiales, colores, maniquies as initialManiquies } from './data/data'

function App() {
  const [filter, setFilter] = useState('todas')
  const [view, setView] = useState('inicio')
  const [maniquies, setManiquies] = useState(initialManiquies)
  const [colors, setColors] = useState(colores)
  const [materials, setMaterials] = useState(materiales)

  // Lógica centralizada para el stock disponible
  const piezasEnUso = {
    cabezas: maniquies.length * 1,
    torsos: maniquies.length * 1,
    brazos: maniquies.length * 2,
    piernas: maniquies.length * 2,
  };

  const stockDisponible = {
    cabezas: Math.max(0, cabezas.length - piezasEnUso.cabezas),
    torsos: Math.max(0, torsos.length - piezasEnUso.torsos),
    brazos: Math.max(0, brazos.length - piezasEnUso.brazos),
    piernas: Math.max(0, piernas.length - piezasEnUso.piernas),
  };

  const handleDeleteManiqui = (id) => {
    const confirmar = window.confirm("¿Realmente deseas desarmar este maniquí? Todas sus piezas quedarán libres en el stock.")
    if (confirmar) {
      setManiquies(maniquies.filter(m => m.id_maniqui !== id))
    }
  }

  const handleUpdateManiqui = (maniquiActualizado) => {
    setManiquies(maniquies.map(m => 
      m.id_maniqui === maniquiActualizado.id_maniqui ? maniquiActualizado : m
    ))
  }

  const getPieceData = (pieza) => {
    const isExtremity = pieza.tipo === 'brazo' || pieza.tipo === 'pierna'
    const modelos = isExtremity ? modelosExtremidad : modelosPieza
    const modelo = modelos.find(m => m.id_modelo === pieza.id_modelo)
    const material = materiales.find(m => m.id_material === modelo?.id_material)
    const color = colores.find(c => c.id_color === modelo?.id_color)
    return { ...pieza, material: material?.nombre, color: color?.nombre, modelo }
  }

  const allPieces = [...cabezas, ...torsos, ...brazos, ...piernas].map(getPieceData)

  const filteredPieces = filter === 'todas' 
    ? allPieces 
    : allPieces.filter(p => p.tipo === filter)

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
            <PiezasList piezas={filteredPieces} />
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
          />
        )}

        {view === 'inicio' && (
          <Dashboard 
            maniquies={maniquies} 
            stockDisponible={stockDisponible} 
          />
        )}

        {view === 'colores' && (
          <Colors colors={colors} setColors={setColors} />
        )}

        {view === 'materiales' && (
          <Materials materials={materials} setMaterials={setMaterials} />
        )}
      
      </main>
    </div>
  )
}

export default App