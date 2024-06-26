// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://balanced-delight-production.up.railway.app', // URL base de tu backend con HTTPS
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Permite el uso de cookies y encabezados de autenticación
});

export default axiosInstance;