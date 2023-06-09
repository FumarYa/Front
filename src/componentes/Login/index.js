import React, { useState,useContext } from 'react';
import { DataContext } from '../../context/Dataprovider';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


export const Login = () => {
    const value = useContext(DataContext);
    const [menuLogin, setMenuLogin] = value.menuLogin;
    const [nombre, setNombre] = useState();
    const [contrasena, setContrasena] = useState();
    const{loginWithRedirect} = useAuth0();


    const show1 = menuLogin ? "login show" : "login";
    const show2 = menuLogin ? "login2 show" : "login2";

    const tooglefalse = () =>{
        setMenuLogin(false);
    }

  const iniciarSesion = () => {
    fetch('http://localhost:4000/usuarios/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, contrasena })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.statusText);
        }
      })
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className={show1}>
        <div className={show2}>
            <div className="login_close" onClick={tooglefalse}>
                <box-icon name="x"></box-icon>
            </div>
            <label>Usuario:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <label>Contraseña:</label>
            <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            <button onClick={iniciarSesion}>Iniciar Sesión</button>
            <br/><br/>
            <p >Inicia sesion con google</p>
            <br/><br/>
            <Link to="/registro">
            <p onClick={tooglefalse}>Registrese aqui</p>
            </Link>
        </div>
    </div>
  );
}