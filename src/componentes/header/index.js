import React, {useContext} from "react";
import Fumar from "../../images/fumarya.png";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/Dataprovider";

export const Header = () =>{
    const value = useContext(DataContext);
    const [menu,setMenu] = value.menu;
    const [carrito] = value.carrito;
    const [loading]  = value.loading;
    

    const toogleMenu = () =>{
        setMenu(!menu);
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
            <div className="cart" onClick={toogleMenu}>
                <box-icon name="cart"></box-icon>
                <span className="item_total">{!loading ? carrito.length : ""}</span>
            </div>
        </header>
    )
}