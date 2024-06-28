import React from 'react';

const LoginButton = () => {
    const handleLogin = () => {
        // Para entorno local
        // window.location.href = 'http://localhost:8080/oauth2/authorization/google'; 

        // Para entorno de producción
        window.location.href = 'https://balanced-delight-production.up.railway.app/login/oauth2/authorization/google';
    };

    return (
        <button onClick={handleLogin}>
            Iniciar sesión con Google
        </button>
    );
};

export default LoginButton;
