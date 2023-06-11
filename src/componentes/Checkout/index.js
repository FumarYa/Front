import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/Dataprovider'
import {  useNavigate } from 'react-router-dom';

export const Checkout = () => {
  const value = useContext(DataContext);
  const [carrito, setCarrito] = value.carrito;
  const obtenerTotal = value.obtenerTotal;
  const incrementarCantidad = value.incrementarCantidad;
  const decrementarCantidad = value.decrementarCantidad;
  const [username, setUsername] = value.username;
  const [total, setTotal] = useState(0);
  const [direccion, setDireccion] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!direccion || !municipio || !codigoPostal) {
        alert('Por favor, introduce la dirección, el municipio y el código postal');
        return;
      }

      // Obtener el ID de usuario utilizando el nombre de usuario
      const response = await fetch(`http://localhost:4000/api/usuarios/nombre/${username}`);
      const data = await response.json();
      const idUsuario = data[0].id;

      
  
  
      const dataVenta = {
        idUsuario: idUsuario,
        direccion: direccion,
        municipio: municipio,
        codigoPostal: codigoPostal,
        fecha: new Date().toISOString(),
        estado: 'Completado',
        total: obtenerTotal(),
        productos: carrito.map((producto) => ({
          idProducto: producto.id,
          cantidad: producto.cantidad,
          precioUnitario: producto.precio
        }))
      };
  
      const responseVenta = await fetch('http://localhost:4000/api/ventas/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataVenta)
      });
  
      if (response.ok === true) {
        alert('Pago realizado con éxito');
        setCarrito([]);
        setDireccion('');
        setMunicipio('');
        setCodigoPostal('');
        navigate('/');
      } else {
        alert('Hubo un error al realizar el pago');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div>
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="municipio">Municipio:</label>
        <input
          type="text"
          id="municipio"
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="codigoPostal">Código Postal:</label>
        <input
          type="text"
          id="codigoPostal"
          value={codigoPostal}
          onChange={(e) => setCodigoPostal(e.target.value)}
        />
      </div>
      {carrito.map((producto, index) => (
        <div className="checkout-producto" key={index}>
          <img src={producto.imagen} height="250" width="200" alt={producto.nombre}></img>
          <h3>Producto: {producto.nombre}</h3>
          <p>Cantidad: {producto.cantidad}</p>
          <div>
            <box-icon name="up-arrow" solid onClick={() => incrementarCantidad(producto.id)}></box-icon>
            <p className="cantidad">{producto.cantidad}</p>
            <box-icon name="down-arrow" solid onClick={() => decrementarCantidad(producto.id)} ></box-icon>
          </div>
          <p>Total: {producto.precio * producto.cantidad}€</p>
        </div>
      ))}
      <h3>Total a Pagar: {obtenerTotal()}€</h3>
      <button onClick={handleSubmit}>Pagar</button>
    </div>
  );
};