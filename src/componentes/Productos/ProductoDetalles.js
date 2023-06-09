import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/Dataprovider";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const ProductoDetalles = () => {
  const value = useContext(DataContext);
  const productos = value.productos.data;
  const addCarrito = value.addCarrito;
  const [detalle, setDetalle] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (productos) {
      productos.forEach((producto) => {
        if (producto.id === parseInt(params.id)) {
          setDetalle(producto);
        }
      });
    }
  }, [productos, params.id]);

  return (
    <>
      {
        <div className="detalles">
          <h2>{detalle.nombre}</h2>
          <img src={detalle.imagen} />

          <div className="descripcion">
            <p>
              <b>Descripcion:</b>
              {detalle.descripcion}
              <br />
              sadnlnjfninadvndsnvinajilvnjdsnjvbdjvbkcvjdsbcboihbsvhbsHBdhs
              vjlsb cakjbcvgubxHUCBhaBcilbxLHDBVLb hbdulbcul bullb
              oADSBvobdhovbDCBHObuOE oibidovhoewV DBihcpvidnaijbu8bfpu
              UqhiadHviDBVHFIPCdbvbviphbvoibipvbidsb
              adohbadwodbvkboihbEIFBCbjBVIDOBViueijciDFOipj
            </p>
          </div>

          <p className="precio">{detalle.precio}€</p>
          <button onClick={() => addCarrito(detalle.id)}>
            Añadir al carrito
          </button>
        </div>
      }

      <h2 className="relacionados">Productos Relacionados</h2>
      <div className="productos">
        {productos ? (
          productos.map((producto) =>
            detalle.tipo === producto.tipo ? (
              <div className="producto" key={producto.id}>
                <Link to={`/productos/${producto.id}`}>
                  <div className="producto_img">
                    <img
                      src={producto.imagen}
                      alt={producto.title}
                      width="100"
                      height="250"
                    />
                  </div>
                </Link>
                <div className="producto_footer">
                  <h1>{producto.title}</h1>
                  <p>{producto.marca}</p>
                  <p className="price">{producto.precio}€</p>
                  <p>{producto.tipo}</p>
                </div>
                <div className="buttom">
                  <button
                    className="btn"
                    onClick={() => addCarrito(producto.id)}
                  >
                    Añadir al carrito
                  </button>
                  <Link to={`/productos/${producto.id}`} className="btn">
                    Vista
                  </Link>
                </div>
              </div>
            ) : null
          )
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </>
  );
};
