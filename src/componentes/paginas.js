import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom"
import { Inicio } from "./Inicio";
import { ProductosLista } from "./Productos/index";
import { ProductoDetalles } from "./Productos/ProductoDetalles";
import { Registro } from "./Registro";
import { Configuraciones } from "./Configuraciones";
import { Usuarios } from "./Usuarios";
import { Ventas } from "./Ventas";
import { SettingProduct } from "./SettingProduct";
import { Checkout } from "./Checkout";
import { DataContext } from "../context/Dataprovider";
import { ApartadoLegal } from "./ApartadoLegal";

export const Paginas = () => {
    const value = useContext(DataContext);
    const [role, setRole] = value.role; 

    return (
        <section>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/productos" element={<ProductosLista />}/>
                <Route path="/productos/:id" element={<ProductoDetalles />}></Route>
                <Route path="/registro" element={<Registro />}></Route>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/apartadolegal" element={<ApartadoLegal />}/>

                {role === 'Admin' && 
                <>
                    <Route path="/configuraciones" element={<Configuraciones />} />
                    <Route path="/settingProduct" element={<SettingProduct />} />
                    <Route path="/ventas" element={<Ventas />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                </>}
            </Routes>
        </section>
    )
}