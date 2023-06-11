import React from 'react'
import { Link } from 'react-router-dom'

export const Configuraciones = () => {
  return (
    <div className="configs">
        <Link to= "/settingProduct">
            <h1 className="">Añadir/Eliminar un producto</h1>
        </Link>
        <Link to= "/ventas">
            <h1 className=''>Ver ventas</h1>
        </Link>
        <Link to= "/usuarios">
            <h1 className=''>Ver usuarios registrados</h1>
        </Link>
    </div>
  )
}
