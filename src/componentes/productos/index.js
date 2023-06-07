import React, { useEffect } from "react";
import { useFetch } from "../UseFetch/index";
import Imagen from "../../images/Imagen17.png";

export const ProductosLista = () => {
    const [state, fetchProductos] = useFetch();

    useEffect(
      function () {
        fetchProductos({
          url: "http://localhost:4000/api/producto/all",
          method: "GET",
      });
      },
      [fetchProductos]
     );
  
    if (state.isLoading) {
       return <div>Cargando productos .. </div>;
    }
     if (state.isFailed) {
      return <div>Fallo recuperando los productos</div>;
     }
     if (state.isSuccess) {
      return (
          <>
              <h1 className="title">PRODUCTOS</h1>
              <div className="productos">
                  {state.data.map((producto) => (
                      <div className="producto" key={producto.id}>
                          <a href="#">
                              <div className="producto_img">
                                  <img src={producto.imagen} alt={producto.title} />
                              </div>
                          </a>
                          <div className="producto_footer">
                              <h1>{producto.title}</h1>
                              <p>{producto.marca}</p>
                              <p className="price">{producto.precio}</p>
                              <p>{producto.tipo}</p>
                          </div>
                          <div className="buttom">
                              <button className="btn">Añadir al carrito</button>
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
