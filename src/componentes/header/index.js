import React, {useContext} from "react";
import Fumar from "../../images/fumarya.png";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/Dataprovider";

export const Header = () =>{
    const value = useContext(DataContext);
    const [menuCarrito,setMenuCarrito] = value.menuCarrito;
    const [menuLogin,setMenuLogin] = value.menuLogin;
    const [carrito] = value.carrito;
    const [loading]  = value.loading;
    const [isAuthenticated, setIsAuthenticated] = value.isAuthenticated;
    const [username, setUsername] = value.username;


    const toogleMenuCarrito = () =>{
        setMenuCarrito(!menuCarrito);
    }

    const toogleMenuLogin = () =>{
        setMenuLogin(!menuLogin);
    }

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <header>
          <Link to="/">
            <div className="logo">
              <img src={Fumar} alt="logo" width="150px"></img>
            </div>
          </Link>
          <ul>
            <li>
              <Link to="/">INICIO</Link>
            </li>
            <li>
              <Link to="/productos">Productos</Link>
            </li>
          </ul>
          <div className="cart" onClick={toogleMenuCarrito}>
            <box-icon name="cart"></box-icon>
            <span className="item_total">{!loading ? carrito.length : ""}</span>
          </div>
    
          {isAuthenticated ? (
            <>
              <div className="username">
                <h2>{username}</h2>
              </div>
    
              <div className="logout" onClick={logout}>
                <box-icon name="door-open"></box-icon>
              </div>
            </>
          ) : (
            <div className="log" onClick={toogleMenuLogin}>
              <box-icon name="user"></box-icon>
            </div>
          )}
        </header>
      );
    };

