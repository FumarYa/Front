import React, {useContext} from "react";
import Fumar from "../../images/fumarya.png";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/Dataprovider";
import { useAuth0 } from '@auth0/auth0-react';

export const Header = () =>{
    const value = useContext(DataContext);
    const [menuCarrito,setMenuCarrito] = value.menuCarrito;
    const [menuLogin,setMenuLogin] = value.menuLogin;
    const [carrito] = value.carrito;
    const [loading]  = value.loading;
    const {loginWithRedirect,logout,user,isAuthenticated} = useAuth0();


    const toogleMenuCarrito = () =>{
        setMenuCarrito(!menuCarrito);
    }

    const toogleMenuLogin = () =>{
        setMenuLogin(!menuLogin);
    }
    return(
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
            <h2>{user.name}</h2>
        </div>

        <div className="logout" onClick={() => logout({returnTo:window.location.origin})}>
            <box-icon name="door-open"></box-icon>
        </div>
        </>
        ) : (
        <div className="log" onClick={() => toogleMenuLogin()}>
            <box-icon name="user"></box-icon>
        </div>
        )}
        </header>
    )
}