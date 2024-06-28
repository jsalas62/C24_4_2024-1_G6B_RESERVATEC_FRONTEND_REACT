// src/components/CheckUserStatus.js
import React, { useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const CheckUserStatus = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('api/user/check')
            .then(response => {
                const redirectUrl = response.headers.location;
                if (redirectUrl) {
                    window.location.href = redirectUrl;  // Redirige al URL devuelto por el backend
                }
            })
            .catch(error => {
                console.error('Error al verificar el estado del usuario:', error);
                navigate('/login');  // Redirige a la página de login si hay un error
            });
    }, [navigate]);

    return <div>Verificando estado del usuario...</div>;
};

export default CheckUserStatus;
