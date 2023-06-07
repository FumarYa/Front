import React from 'react'
import Portada from "../../images/tabaquito.avif"
import { Link } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className="inicio">
        <Link to= "">
            <h1 className="">Inicio</h1>
        </Link>
        <Link to= "/productos">
            <h1 className=''>Productos</h1>
        </Link>
        <img src={Portada} alt="inicio"/>
    </div>
  )
}
