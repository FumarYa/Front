import React, { useContext,useEffect, useState } from 'react'
import { DataContext } from '../../context/Dataprovider'


export const Carrito = () => {
    const value = useContext(DataContext);
    const [menu, setMenu] = value.menu;
    const [carrito,setCarrito] = value.carrito;
    const incrementarCantidad = value.incrementarCantidad;
    const decrementarCantidad = value.decrementarCantidad;
    const obtenerTotal = value.obtenerTotal;
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(obtenerTotal());
    }, [carrito, obtenerTotal]);
    
    
    const tooglefalse = () =>{
        setMenu(false);
    }

    const show1 = menu ? "carritos show" : "carritos";
    const show2 = menu ? "carrito show" : "carrito";

    const removeProducto= (id) =>{
        if(window.confirm("¿Quieres borrar este producto?")){
            carrito.forEach((item,index) => {
                if(item.id === id){
                    item.cantidad = 1;
                    carrito.splice(index, 1)
                }
            }
            )}
            setCarrito([...carrito]);
    }

  return (
    <div className={show1}>
        <div className={show2}>
            <div className="carrito_close" onClick={tooglefalse}>
                <box-icon name="x"></box-icon>
            </div>
            <h2>Su Carrito</h2>

            <div className="carrito_center">
        { 
            carrito.length === 0 ? <h2 style={{
                textAlign: "center", fontSize: "3rem"
            }}>Carrito Vacio</h2> : <>
        {
            carrito.map((producto)=>(
                <div className="carrito_item" key={producto.id}>
                    <img src={producto.imagen} alt=''height="200"></img>
                    <div>
                        <h3>{producto.nombre}</h3>
                        <p className="price">{producto.precio}€</p>
                    </div>
                    <div>
                        <box-icon name="up-arrow" solid onClick={() => incrementarCantidad(producto.id)}></box-icon>
                        <p className="cantidad">{producto.cantidad}</p>
                        <box-icon name="down-arrow" solid onClick={() => decrementarCantidad(producto.id)} ></box-icon>
                    </div>
                    <div className="remove_item" onClick={() => removeProducto(producto.id)}>
                    <box-icon name="trash" solid></box-icon>
                    </div>
                </div>
            ))
        }
            </>
                
        }
            </div>  

     
            <div className="carrito_footer">
                <h3>Total: {total}€</h3>
                <button className="btn">Pago</button>
            </div>
     
    
        </div>
    </div>
  )
}
