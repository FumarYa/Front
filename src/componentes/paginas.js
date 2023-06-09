import React from "react";
import { Routes, Route } from "react-router-dom"
import { Inicio } from "./Inicio";
import { ProductosLista } from "./Productos/index";
import { ProductoDetalles } from "./Productos/ProductoDetalles";
import { Registro } from "./Registro";

export const Paginas = () =>{
    return(
        <section>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/productos" element={<ProductosLista />}/>
                <Route path="/productos/:id" element={<ProductoDetalles />}></Route>
                <Route path="/registro" element={<Registro />}></Route>
            </Routes>
        </section>
    )
}