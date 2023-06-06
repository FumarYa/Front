import React from "react";
import Fumar from "../../images/fumarya.png";

export const Header = () =>{
    return(
        <header>
            <a href="#">
                <div className="logo">
                    <img src={Fumar} alt="logo" width="150px"></img>
                </div>
            </a>
            <ul>
                <li>
                    <a href="#">INICIO</a>
                </li>
                <li>
                    <a href="#">Productos</a>
                </li>
            </ul>
            <div className="cart">
                <box-icon name="cart"></box-icon>
                <span className="item_total">0</span>
            </div>
        </header>
    )
}