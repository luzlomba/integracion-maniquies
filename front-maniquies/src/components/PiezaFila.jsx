import { formatearFecha } from '../utils/fecha'

function PiezaFila({ pieza, onEdit, onDelete }) {
  const estaEnUso = pieza.estado === 'En uso'

  return (
    <tr>
      <td>{pieza.tipo}</td>
      <td>{pieza.nro_serie}</td>
      <td>{pieza.material}</td>
      <td>{pieza.color}</td>
      <td>{pieza.genero || '-'}</td>
      <td>{pieza.modelo?.talle || '-'}</td>
      <td>{pieza.modelo?.lado || '-'}</td>
      <td>{formatearFecha(pieza.fecha_fabricacion)}</td>
      <td>
        <span className={`badge ${pieza.estado === 'En uso' ? 'badge-en-uso' : 'badge-disponible'}`}>
          {pieza.estado}
        </span>
      </td>
      <td>
        <button
          onClick={() => onEdit(pieza)}
          className="btn-action btn-edit"
          title="Editar pieza"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(pieza)}
          className="btn-action btn-delete"
          title={estaEnUso ? 'No se puede eliminar una pieza en uso' : 'Eliminar pieza'}
          disabled={estaEnUso}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default PiezaFila