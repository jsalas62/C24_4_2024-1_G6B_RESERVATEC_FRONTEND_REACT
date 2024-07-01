import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';


const CustomNavbar = () => {
    return (
        <header className='navBar'>
      <ul className='ul_navBar'>
        <li className='li_navBar'><Link to="/inicio">Inicio</Link></li>
        <li className='li_navBar'><Link to="/profile">Perfil</Link></li>
        <li className='li_navBar'><Link to="/reservas/todas">Reservas Tecsup</Link></li>
        <li className='li_navBar'><Link to="/reserva/misreservas">Mis reservas</Link></li>
        
        <LogoutButton/>
      </ul>
    </header>
    );
};

export default CustomNavbar;
