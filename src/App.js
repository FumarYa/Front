import React from 'react';
import { Header } from './componentes/Header';
import { ProductosLista } from './componentes/Productos';
/* import {ApiProducto} from './componentes/routes/index'; */
import 'boxicons';
import { BrowserRouter as Router} from "react-router-dom"
import {Paginas} from "./componentes/Paginas"; 
import { Dataprovider } from './context/Dataprovider';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      
      <Paginas />
      </Router>
    </div>
  );
}

export default App;