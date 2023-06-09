import React from "react";
import { Routes, Route } from "react-router-dom"
import { Inicio } from "./Inicio";
import { ProductosLista } from "./Productos/index";
import { ProductoDetalles } from "./Productos/ProductoDetalles";

export const Paginas = () =>{
    return(
        <section>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/productos" element={<ProductosLista />}/>
                <Route path="/productos/:id" element={<ProductoDetalles />}></Route>
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </section>
    )
}