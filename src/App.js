import React,{useContext,useEffect} from 'react';
import { Header } from './componentes/Header';
import 'boxicons';
import { BrowserRouter as Router} from "react-router-dom"
import {Paginas} from "./componentes/Paginas"; 
import { Carrito } from './componentes/Carrito';
import { Dataprovider,DataContext } from './context/Dataprovider';
import { CookieBanner } from './componentes/CookieBanner';
import { Login } from './componentes/Login';




function App() {
  const {acceptCookies, cookiesAccepted } = useContext(DataContext);
  const value = useContext(DataContext);
  
  return (
    <Dataprovider>
      <div className="App">
        {!cookiesAccepted && <CookieBanner acceptCookies={acceptCookies} />}
        <Router>
          <Header />
          <Carrito /> 
          <Login />
          <Paginas />
        </Router>
      </div>
    </Dataprovider>
  );
}

export default App;