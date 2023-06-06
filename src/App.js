import React from 'react';
import { Header } from './componentes/header';
import { ProductosLista } from './componentes/productos/index';
/* import {ApiProducto} from './componentes/routes/index'; */
import 'boxicons';

function App() {
  return (
    <div className="App">
      <Header />
      <ProductosLista />
     {/*  <ApiProducto /> */}
    </div>
  );
}

export default App;