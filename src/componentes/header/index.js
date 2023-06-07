import React from "react";
import Fumar from "../../images/fumarya.png";
import { Link } from "react-router-dom";

export const Header = () =>{
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
            <div className="cart">
                <box-icon name="cart"></box-icon>
                <span className="item_total">0</span>
            </div>
        </header>
    )
}