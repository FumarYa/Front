import React from 'react'
import Image from "../../images/Imagen17.png"

export const Carrito = () => {
  return (
    <div className="carritos">
        <div className="carrito">
            <div className="carrito_close">
                <box-icon name="x"></box-icon>
            </div>
            <h2>Su Carrito</h2>
            <div className="carrito_center">


                <div className="carrito_item">
                    <img src={Image} alt=''></img>
                </div>
            </div>
        </div>
    </div>
  )
}
