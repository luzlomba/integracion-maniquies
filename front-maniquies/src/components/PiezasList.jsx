import PiezaFila from './PiezaFila'

function PiezasList({ piezas, onNewPiece, onEditPiece, onDeletePiece }) {
  return (
    <div>
      <div className="list-header">
        <h2>Piezas ({piezas.length})</h2>
        <button onClick={onNewPiece} className="btn-new">
          + Nueva Pieza
        </button>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>N° Serie</th>
              <th>Material</th>
              <th>Color</th>
              <th>Género</th>
              <th>Talle</th>
              <th>Lado</th>
              <th>Fecha fabricación</th>
              <th>Estado</th> 
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {piezas.map((pieza) => {
              // Generamos un ID único combinando el tipo y el ID real
              const idUnico = pieza.id_cabeza || pieza.id_torso || pieza.id_brazo || pieza.id_pierna;
              const keyUnica = `${pieza.tipo}-${idUnico}`;

              return (
                <PiezaFila
                  key={keyUnica} 
                  pieza={pieza}
                  onEdit={onEditPiece}
                  onDelete={onDeletePiece}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PiezasList