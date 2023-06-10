import React, { useState,useContext } from 'react';
import { DataContext } from '../../context/Dataprovider';
import { Link, useNavigate  } from 'react-router-dom';



export const Login = () => {
    const value = useContext(DataContext);
    const [menuLogin, setMenuLogin] = value.menuLogin;
    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [isAuthenticated, setIsAuthenticated] = value.isAuthenticated;
    const [username, setUsername] = value.username;
    const navigate = useNavigate();


    const show1 = menuLogin ? "login show" : "login";
    const show2 = menuLogin ? "login2 show" : "login2";

    const tooglefalse = () =>{
        setMenuLogin(false);
    }

    const iniciarSesion = () => {
      fetch('http://localhost:4000/api/usuarios/login', {
        method: 'POST',
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
        .then(data => {
          if(data === "El Usuario con su contraseña es correcta") {
            setIsAuthenticated(true);
            setUsername(nombre);
            navigate("/");
            setMenuLogin(false);
          }
        })
        
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


            <button onClick={() => iniciarSesion()}>Iniciar Sesión</button>

            <br/><br/>

            <Link to="/registro">
            <p onClick={tooglefalse}>Registrese aqui</p>
            </Link>
        </div>
    </div>
  );
}