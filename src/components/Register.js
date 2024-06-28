// src/components/Register.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [userData, setUserData] = useState({
        nombres: '',
        email: '',
        codigoTecsup: '',
        carrera: { id: '' },
    });
    const [carreras, setCarreras] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener datos del usuario desde el perfil
        axiosInstance.get('/api/user/profile')
            .then(response => {
                const { nombres, email, codigoTecsup, carrera } = response.data;
                setUserData(prevState => ({
                    ...prevState,
                    nombres: nombres || '',
                    email: email || '',
                    codigoTecsup: codigoTecsup || '',
                    carrera: { id: carrera ? carrera.id : '' }
                }));
            })
            .catch(error => console.error('Error al obtener perfil:', error));

        // Obtener la lista de carreras
        axiosInstance.get('/api/carreras')
            .then(response => setCarreras(response.data))
            .catch(error => console.error('Error al obtener carreras:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'carreraId') {
            setUserData(prevState => ({
                ...prevState,
                carrera: { ...prevState.carrera, id: value },
            }));
        } else {
            setUserData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post('/api/user/register', userData)
            .then(() => {
                alert('Registro exitoso!');
                navigate('/inicio');
            })
            .catch(error => {
                console.error('Error al registrar usuario:', error);
                alert('Error al registrar usuario. Intenta de nuevo.');
            });
    };

    return (
        <div className="container mt-5">
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombres"
                        value={userData.nombres}
                        onChange={handleChange}
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Código Tecsup:</label>
                    <input
                        type="text"
                        name="codigoTecsup"
                        value={userData.codigoTecsup}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Carrera:</label>
                    <select
                        name="carreraId"
                        value={userData.carrera.id}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Selecciona una Carrera</option>
                        {carreras.map(carrera => (
                            <option key={carrera.id} value={carrera.id}>
                                {carrera.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
