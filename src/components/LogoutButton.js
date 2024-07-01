import React from 'react';
import axiosInstance from '../axiosConfig';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await axiosInstance.post('/logout');
            alert('Logout exitoso'); // Puedes mostrar un mensaje de confirmación si lo deseas
            window.location.href = 'http://localhost:3000';
        } catch (error) {
            console.error('Error al realizar logout:', error);
            alert('Error al intentar cerrar sesión. Inténtalo de nuevo.'); // Manejo básico de errores
        }
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
    );
};

export default LogoutButton;
