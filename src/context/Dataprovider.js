import React,{createContext, useState, useEffect} from 'react'
import { useFetch } from '../componentes/UseFetch/index';

export const DataContext = createContext();

export const Dataprovider = ({ children }) => {
    const [menuCarrito,setMenuCarrito] = useState(false);
    const [menuLogin,setMenuLogin] = useState(false);
    const [state, fetchProductos] = useFetch();
    const [todosProductos, setTodosProductos] = useState(null);
    const[carrito,setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cookiesAccepted, setCookiesAccepted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState();
    const [role, setRole] = useState("");

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
      if (state.isSuccess) {
        setTodosProductos(state.data);
      }
    }, [state]);

    
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

    //operaciones del carrito
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
    
    //añade el producto al carrito si el usuario esta autenticado
    const addCarrito = (id) => {
      if (isAuthenticated) {
        const check = carrito.every((item) => {
          return item.id !== id;
        });
        if (check) {
          const data = state.data
            .filter((producto) => {
              return producto.id === id;
            })
            .map((producto) => {
              return { ...producto, cantidad: 1 };
            });
          setCarrito([...carrito, ...data]);
        } else {
          alert("El producto ya se ha añadido al carrito.");
        }
      } else {
        alert("Debes iniciar sesión para agregar productos al carrito.");
      }
    };

    //carga el carrito desde el localstorage
    useEffect(() =>{
      const dataCarrito = JSON.parse(localStorage.getItem('dataCarrito'));
      if(dataCarrito){
        setCarrito(dataCarrito);
      }
      setLoading(false)
    }, [state])


    //Guarda el carrito en el localStorage
    useEffect(() => {
      if (!loading && carrito) {
        localStorage.setItem('dataCarrito', JSON.stringify(carrito));
      }
    }, [carrito, loading]);

    //Limpia el carrito cuando se cambia de usuario.
    useEffect(() => {
      if (!isAuthenticated) {
        setCarrito([]);
        localStorage.removeItem('dataCarrito');
      }
    }, [isAuthenticated]);

    //Funcion para buscar productos
    const buscarProductos = (nombre) => {
      fetchProductos({
          url: `http://localhost:4000/api/producto/nombre/${nombre}`,
          method: "GET",
      });
  }

    //Valores del contexto
    const value = {
        menuCarrito: [menuCarrito,setMenuCarrito],
        menuLogin: [menuLogin,setMenuLogin],
        productos: state, // Aquí añadimos los productos al contexto.
        todosProductos: [todosProductos, setTodosProductos],
        carrito: [carrito,setCarrito],
        addCarrito: addCarrito,
        incrementarCantidad: incrementarCantidad,
        decrementarCantidad: decrementarCantidad,
        obtenerTotal: obtenerTotal,
        acceptCookies: acceptCookies,
        cookiesAccepted: cookiesAccepted,
        isAuthenticated: [isAuthenticated, setIsAuthenticated],
        username: [username, setUsername],
        loading: [loading, setLoading], // añade loading al contexto
        buscarProductos: buscarProductos,
        role: [role, setRole],
    }
  
  return (
    <DataContext.Provider value = {value}>
        {children}
    </DataContext.Provider>
  )
}