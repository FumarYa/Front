import React from "react";
import Imagen from "../../images/Imagen17.png";

export const ProductosLista = () => {
  return (
    <>
      {/* Ayuda a que no retorne componentes padre solo a componentes hijo */}
      <h1 className="title">PRODUCTOS</h1>
      <div className="productos">
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={Imagen} alt="" />
            </div>
          </a>
          <div className="producto_footer">
            <h1> Title </h1>
            <p> Marca </p>
            <p className="price">Precio</p>
            <p> Tipo </p>
          </div>
          <div className="buttom">
            <button className="btn">
                Añadir al carrito
            </button>
            <div>
              <a href="#" className="btn">
                Vista
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
