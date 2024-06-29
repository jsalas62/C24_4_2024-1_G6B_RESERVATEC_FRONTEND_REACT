import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LogoutButton from './LogoutButton'; // Importa el componente LogoutButton

const CustomNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand >Inicio</Navbar.Brand> 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/reservas/todas">Reservas TECSUP</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Mi Perfil</Nav.Link>
                        <Nav.Link as={Link} to="/reserva/nueva">Reservar</Nav.Link>
                        <Nav.Link as={Link} to="/reserva/misreservas">Mis Reservas</Nav.Link>
                    </Nav>
                    <Nav>
                        {/* Aquí colocamos el componente LogoutButton */}
                        <LogoutButton />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
