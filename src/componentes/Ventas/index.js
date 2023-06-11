import React, { useEffect, useState } from 'react'

export const Ventas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/ventas/all')
      .then(res => res.json())
      .then(data => {
        setVentas(data);
      })
      .catch(console.log)
  }, []);
  console.log(ventas)
  return (
    <div className="ventas">
      <table className="venta">
        <thead>
          <tr>
            <th>Id</th>
            <th>IdUsuario</th>
            <th>Direccion</th>
            <th>Municipio</th>
            <th>CodigoPostal</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
        {ventas.map((venta) => (
          <tr key={venta.id}>
            <td>{venta.id}</td>
            <td>{venta.idUsuario}</td>
            <td>{venta.direccion}</td>
            <td>{venta.municipio}</td>
            <td>{venta.codigoPostal}</td>
            <td>{venta.fecha}</td>
            <td>{venta.estado}</td>
            <td>{venta.total}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}