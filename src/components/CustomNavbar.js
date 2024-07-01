import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LogoutButton from './LogoutButton';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { RxTwitterLogo } from 'react-icons/rx';
import { SiAdguard } from 'react-icons/si';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/inicio" className="d-flex align-items-center">
          <FaHome className="me-2" /> Inicio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/reservas/todas" className="d-flex align-items-center mx-10">
              <RxTwitterLogo className="me-2" /> Reservas Tecsup
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className="d-flex align-items-center mx-10">
              <FaUserCircle className="me-2" /> Perfil
            </Nav.Link>
            <Nav.Link as={Link} to="/reserva/misreservas" className="d-flex align-items-center mx-10">
              <SiAdguard className="me-2" /> Mis reservas
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item>
              <LogoutButton className="nav-link" />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
