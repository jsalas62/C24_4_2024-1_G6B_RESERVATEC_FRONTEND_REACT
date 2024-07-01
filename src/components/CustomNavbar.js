import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { RxTwitterLogo } from 'react-icons/rx';
import { SiAdguard } from 'react-icons/si';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = () => {
  return (
    <header className="bg-primary py-3">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link className="navbar-brand" to="/inicio">Reservas</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="/inicio">
                  <FaHome className="mr-2" />
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="/profile">
                  <FaUserCircle className="mr-2" />
                  Perfil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="/reservas/todas">
                  <RxTwitterLogo className="mr-2" />
                  Reservas Tecsup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="/reserva/misreservas">
                  <SiAdguard className="mr-2" />
                  Mis reservas
                </Link>
              </li>
              <li className="nav-item">
                <LogoutButton className="nav-link" />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default CustomNavbar;
