import React, { useEffect, useState } from 'react'

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/usuarios/all')
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
      })
      .catch(console.log)
  }, []);
  return (
    <div className="usuarios">
      <table className="usuario">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Contrasena</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>FechaNacimiento</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.contrasena}</td>
            <td>{usuario.telefono}</td>
            <td>{usuario.correo}</td>
            <td>{usuario.fechanacimiento}</td>
            <td>{usuario.rol}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}