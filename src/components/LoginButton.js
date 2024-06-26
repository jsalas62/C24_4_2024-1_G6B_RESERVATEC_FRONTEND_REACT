// src/components/LoginButton.js
import React from 'react';

const LoginButton = () => {
    const handleLogin = () => {
        window.location.href = 'https://balanced-delight-production.up.railway.app/oauth2/authorization/google'; // URL para iniciar el proceso de OAuth2 con Google
    };

    return (
        <button onClick={handleLogin}>
            Iniciar sesión con Google
        </button>
    );
};

export default LoginButton;
