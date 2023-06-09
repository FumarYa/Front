import React, { useState } from 'react';

export const Registro = () =>{
    console.log("registrme esta")
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');

  const registrar = () => {
    fetch('http://localhost:4000/usuarios/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, contrasena })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <label>Nombre:</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <label>Contraseña:</label>
      <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
      <button onClick={registrar}>Registrarse</button>
    </div>
  );
}

export default Registro;