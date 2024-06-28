import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Si el usuario está autenticado y no estamos cargando, redirige a la página principal
        if (!isLoading && isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        // Mostrar un spinner mientras se está cargando
        return (
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (isAuthenticated) {
        // Redirige al usuario a la página principal si ya está autenticado
        navigate('/');
        return null;
    }

    const handleLogin = () => {
        // Para entorno local
        //window.location.href = 'http://localhost:8080/oauth2/authorization/google';

        // Para entorno de producción
        window.location.href = 'https://balanced-delight-production.up.railway.app/oauth2/authorization/google';
    };

    // Mostrar la página de login si el usuario no está autenticado
    return (
        <div className="container mt-5">
            <h1 className="text-center">Login Page</h1>
            <div className="d-flex justify-content-center">
                <button
                    onClick={handleLogin}
                    className="btn btn-danger btn-lg"
                    style={{ backgroundColor: '#3367D6', borderColor: '#3367D6' }}
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                        alt="Google sign-in"
                        style={{ marginRight: 10, marginBottom: 3, width: 20 }}
                    />
                    Login with Google
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
