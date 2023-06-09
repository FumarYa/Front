import React, { useContext } from "react";
import { DataContext } from '../../context/Dataprovider'

export const ProductosLista = () => {
    const { productos, addCarrito } = useContext(DataContext);

    if (productos.isLoading) {
       return <div>Cargando productos .. </div>;
    }
    if (productos.isFailed) {
      return <div>Fallo recuperando los productos</div>;
    }
    if (productos.isSuccess) {
      return (
          <>
              <h1 className="title">PRODUCTOS</h1>
              <div className="productos">
                  {productos.data.map((producto) => (
                      <div className="producto" key={producto.id}>
                          <a href="#">
                              <div className="producto_img">
                                  <img src={producto.imagen} alt={producto.title} width= "100" height="250"/>
                              </div>
                          </a>
                          <div className="producto_footer">
                              <h1>{producto.title}</h1>
                              <p>{producto.marca}</p>
                              <p className="price">{producto.precio}€</p>
                              <p>{producto.tipo}</p>
                          </div>
                          <div className="buttom">
                              <button className="btn" onClick={()=>addCarrito(producto.id)}>Añadir al carrito</button>
                              <a href="#" className="btn">Vista</a>
                          </div>
                      </div>
                  ))}
              </div>
          </>
      );
    }
    return null;
};