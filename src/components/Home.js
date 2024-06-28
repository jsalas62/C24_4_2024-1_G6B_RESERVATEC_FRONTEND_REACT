// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig'; // Asegúrate de importar la instancia configurada
import CustomNavbar from './CustomNavbar';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Hacer una llamada a la API cuando el componente se monta
        axiosInstance.get('/api/home', { withCredentials: true })
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('Error fetching message:', error);
                setMessage('Error fetching message');
            });
    }, []);

    return (
        <div>
            <CustomNavbar />
            <main className="container mt-4">
                <h1>Home Page</h1>
                <p>Bienvenido a la página de inicio.</p>
                <p>{message}</p>
            </main>
        </div>
    );
};

export default Home;
