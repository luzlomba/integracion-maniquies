import PiezaFila from './PiezaFila'

function PiezasList({ titulo, piezas }) {
  return (
    <div>
      <h2>{titulo}</h2>
      <div className="table-container"></div>
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>N° Serie</th>
              <th>Material</th>
              <th>Color</th>
              <th>Talle</th>
              <th>Lado</th>
              <th>Fecha fabricación</th>
            </tr>
          </thead>
          <tbody>
            {piezas.map((pieza) => (
              <PiezaFila 
                key={pieza.id_cabeza || pieza.id_torso || pieza.id_brazo || pieza.id_pierna} 
                pieza={pieza} 
              />
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default PiezasList