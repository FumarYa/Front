import React,{createContext, useState, useEffect} from 'react'
import { useFetch } from '../componentes/UseFetch/index';

export const DataContext = createContext();

export const Dataprovider = ({ children }) => {
    const [menu,setMenu] = useState(false);
    const [state, fetchProductos] = useFetch();
    const[carrito,setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(
      function () {
        const dataCarrito = JSON.parse(localStorage.getItem('dataCarrito'));
          fetchProductos({
            url: "http://localhost:4000/api/producto/all",
            method: "GET",
          });
      },
      [fetchProductos]
    );

    const incrementarCantidad = (id) => {
      setCarrito(
        carrito.map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    };
    
    const decrementarCantidad = (id) => {
      setCarrito(
        carrito.map(item =>
          item.id === id && item.cantidad > 1
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
      );
    };

    const obtenerTotal = () => {
      return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    };
    

    const addCarrito = (id) => {
      const check = carrito.every((item) => {
        return item.id !== id;
      });
      if (check) {
        const data = state.data
          .filter((producto) => {
            return producto.id === id;
          })
          .map((producto) => {
            return { ...producto, cantidad: 1 }; // Añade propiedad cantidad
          });
        setCarrito([...carrito, ...data]);
      } else {
        alert("El producto ya se ha añadido al carrito.");
      }
    };
    useEffect(() =>{
      const dataCarrito = JSON.parse(localStorage.getItem('dataCarrito'));
      if(dataCarrito){
        setCarrito(dataCarrito);
      }
      setLoading(false)
    }, [state])

    useEffect(() => {
      if (!loading && carrito) {
        localStorage.setItem('dataCarrito', JSON.stringify(carrito));
      }
    }, [carrito, loading]);

    const value = {
        menu: [menu,setMenu],
        productos: state, // Aquí añadimos los productos al contexto.
        carrito: [carrito,setCarrito],
        addCarrito: addCarrito,
        incrementarCantidad: incrementarCantidad,
        decrementarCantidad: decrementarCantidad,
        obtenerTotal: obtenerTotal,
        loading: [loading, setLoading], // añade loading al contexto
    }
  
  return (
    <DataContext.Provider value = {value}>
        {children}
    </DataContext.Provider>
  )
}