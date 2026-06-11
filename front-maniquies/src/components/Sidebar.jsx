function Sidebar({ setView }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>MANIQUÍES</h2>
        <p>FÁBRICA</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li onClick={() => setView('inicio')}>Inicio</li>
          <li onClick={() => setView('ensamblador')}>Ensamblador</li>
          <li onClick={() => setView('piezas')}>Piezas</li>
          <li onClick={() => setView('maniquies')}>Maniquíes</li>
          <li onClick={() => setView('materiales')}>Materiales</li>
          <li onClick={() => setView('colores')}>Colores</li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <a href="mailto:tu@email.com">📧 Contacto</a>
      </div>
    </aside>
  )
}

export default Sidebar