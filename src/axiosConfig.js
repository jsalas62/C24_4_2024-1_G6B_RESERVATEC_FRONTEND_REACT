import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:8080', // URL base de tu backend con HTTPS
    baseURL: 'https://balanced-delight-production.up.railway.app',
    withCredentials: true, // Esto asegura que las cookies se envíen con cada solicitud
    headers: {
        'Content-Type': 'application/json', // Configura el tipo de contenido como JSON
        'Accept': 'application/json', // Acepta respuestas en formato JSON
    }
});

export default axiosInstance;
