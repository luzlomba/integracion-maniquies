function Dashboard({ maniquies, stockDisponible }) {
  const totalDisponibles = Object.values(stockDisponible).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="view-container">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Maniquíes Armados</h3>
          <p>{maniquies.length}</p>
        </div>
        <div className="stat-card">
          <h3>Piezas Libres</h3>
          <p>{totalDisponibles}</p>
        </div>
      </div>

      <div className="stat-card mt-20">
        <h3>Inventario Disponible</h3>
        <div className="dashboard-grid mt-15">
          <div><h4>Cabezas</h4><p>{stockDisponible.cabezas}</p></div>
          <div><h4>Torsos</h4><p>{stockDisponible.torsos}</p></div>
          <div><h4>Brazos</h4><p>{stockDisponible.brazos}</p></div>
          <div><h4>Piernas</h4><p>{stockDisponible.piernas}</p></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard