import React from 'react';
import { Header } from './componentes/Header';
import 'boxicons';
import { BrowserRouter as Router} from "react-router-dom"
import {Paginas} from "./componentes/Paginas"; 
import { Carrito } from './componentes/Carrito';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <Carrito />  
      <Paginas />
      </Router>
    </div>
  );
}

export default App;