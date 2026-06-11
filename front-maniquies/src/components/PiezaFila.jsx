function PiezaFila({ pieza }) {
  return (
    <tr>
      <td>{pieza.tipo}</td>
      <td>{pieza.nro_serie}</td>
      <td>{pieza.material || '-'}</td>
      <td>{pieza.color || '-'}</td>
      <td>{pieza.modelo?.talle || '-'}</td>
      <td>{pieza.modelo?.lado || '-'}</td>
      <td>{pieza.fecha_fabricacion}</td>
    </tr>
  )
}

export default PiezaFila