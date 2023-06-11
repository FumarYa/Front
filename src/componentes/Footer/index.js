import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
        <p>© {year} Nombre de tu página. Todos los derechos reservados.</p>
        <Link to="/apartadolegal" style={{color: '#007bff'}}>Apartado Legal</Link>
    </footer>
  );
}

export default Footer;