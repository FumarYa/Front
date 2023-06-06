import React, { useEffect } from "react";
import { useFetch } from "../useFetch";

export const ApiProducto = ()=> {
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
      <div>
        <ul>
          {state.data.map((producto) => (
            <li key={producto.nombre}>
              <h2>{producto.nombre}</h2>
              <p>Marca: {producto.marca}</p>
              <p>Descripción: {producto.descripcion}</p>
              <p>Precio: {producto.precio}</p>
              <p>Tipo: {producto.tipo}</p>
              <img src={producto.imagen} width="60" height="40" />
            </li>
          ))}
        </ul>
      </div>
    );
   }
  return null;
}