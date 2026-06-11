function PiezaCard({ pieza }) {
  return (
    <div className="pieza-card">
      <p>N° Serie: {pieza.nro_serie}</p>
      <p>Fecha: {pieza.fecha_fabricacion}</p>
      <p>Modelo: {pieza.id_modelo}</p>
    </div>
  )
}

export default PiezaCard