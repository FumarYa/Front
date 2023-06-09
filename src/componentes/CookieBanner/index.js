import React from 'react'

export const CookieBanner = ({ acceptCookies }) => {
  return (
    <div className="cookie-banner">
      <p>Usamos cookies para mejorar su experiencia. Al utilizar nuestro sitio, acepta nuestra política de cookies.</p>
      <button onClick={acceptCookies}>Aceptar</button>
    </div>
  )

 
}
