import React,{createContext, useState, useEffect} from 'react'
import { useFetch } from '../componentes/UseFetch/index';

export const DataContext = createContext();

export const Dataprovider = ({ children }) => {
    const [menuCarrito,setMenuCarrito] = useState(false);
    const [menuLogin,setMenuLogin] = useState(false);
    const [state, fetchProductos] = useFetch();
    const[carrito,setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cookiesAccepted, setCookiesAccepted] = useState(false);

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

    
    useEffect(() => {
      const accepted = localStorage.getItem('cookiesAccepted');
      if (accepted) {
        console.log('Setting cookiesAccepted to true from localStorage');
        setCookiesAccepted(false);
      }
    }, []);


    // Guarda la aceptación de cookies del usuario en localStorage
    const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', true);
    setCookiesAccepted(true);
  };

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
        menuCarrito: [menuCarrito,setMenuCarrito],
        menuLogin: [menuLogin,setMenuLogin],
        productos: state, // Aquí añadimos los productos al contexto.
        carrito: [carrito,setCarrito],
        addCarrito: addCarrito,
        incrementarCantidad: incrementarCantidad,
        decrementarCantidad: decrementarCantidad,
        obtenerTotal: obtenerTotal,
        acceptCookies: acceptCookies,
        cookiesAccepted: cookiesAccepted,
        loading: [loading, setLoading], // añade loading al contexto
    }
  
  return (
    <DataContext.Provider value = {value}>
        {children}
    </DataContext.Provider>
  )
}