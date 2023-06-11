import React, { useContext, useState, useEffect,useRef } from "react";
import { DataContext } from '../../context/Dataprovider'
import { Link } from "react-router-dom";
import { debounce } from 'lodash';

export const ProductosLista = () => {
    const value = useContext(DataContext);
    const { productos, addCarrito,fetchProductos,buscarProductos } = useContext(DataContext);
    const [busqueda, setBusqueda] = useState('');
    const inputRef = useRef(null);

    const handleSearch = (event) => {
        setBusqueda(event.target.value);
    }

    const debouncedBuscarProductos = debounce(buscarProductos, 2000);

    useEffect(() => {
        if (busqueda !== '') {
            debouncedBuscarProductos(busqueda); // usar la versión debounced de buscarProductos
        }
    }, [busqueda]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

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
              <div className="buscador">
              <input className="buscar_texto" type="text" ref={inputRef} value={busqueda} onChange={handleSearch} placeholder="Buscar productos..." />
              <button className="buscar_btn">Buscar</button>
              </div>
              <div className="productos">
                  {productos.data.map((producto) => (
                      <div className="producto" key={producto.id}>
                          <Link to={`/productos/${producto.id}`}>
                              <div className="producto_img">
                                  <img src={producto.imagen} width= "100" height="250"/>
                              </div>
                          </Link>
                          <div className="producto_footer">
                              <h1>{producto.nombre}</h1>
                              <p>{producto.marca}</p>
                              <p className="price">{producto.precio}€</p>
                              <p>{producto.tipo}</p>
                          </div>
                          <div className="buttom">
                              <button className="btn" onClick={()=>addCarrito(producto.id)}>Añadir al carrito</button>
                              <Link to={`/productos/${producto.id}`} className="btn">Vista</Link>
                          </div>
                      </div>
                  ))}
              </div>
          </>
      );
    }
    return null;
};