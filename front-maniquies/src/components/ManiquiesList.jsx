import ManiquiRow from './ManiquiRow'

function ManiquiesList({ maniquies, cabezas, torsos, brazos, piernas, modelosExtremidad, onDelete, onUpdate }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha ensamblaje</th>
            <th>Cabeza</th>
            <th>Torso</th>
            <th>Brazo izq.</th>
            <th>Brazo der.</th>
            <th>Pierna izq.</th>
            <th>Pierna der.</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {maniquies.map((maniqui) => (
            <ManiquiRow
              key={maniqui.id_maniqui}
              maniqui={maniqui}
              maniquies={maniquies}
              cabezas={cabezas}
              torsos={torsos}
              brazos={brazos}
              piernas={piernas}
              modelosExtremidad={modelosExtremidad}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManiquiesList