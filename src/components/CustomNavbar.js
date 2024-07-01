import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import { SiAdguard } from "react-icons/si";


const CustomNavbar = () => {
    return (
        <header className='navBar'>
          <ul className='ul_navBar'>
            <li className='li_navBar'>
            <FaHome color="white" />
            <Link to="/inicio">Inicio</Link></li>
            <li className='li_navBar'><FaUserCircle color='white' />
            <Link to="/profile">Perfil</Link></li>
            <li className='li_navBar'><RxTwitterLogo color='white' />
            <Link to="/reservas/todas">Reservas Tecsup</Link></li>
            <li className='li_navBar'><SiAdguard color='white'/>
            <Link to="/reserva/misreservas">Mis reservas</Link></li>
            
            <LogoutButton/>
          </ul>
        </header>
    );
};

export default CustomNavbar;
