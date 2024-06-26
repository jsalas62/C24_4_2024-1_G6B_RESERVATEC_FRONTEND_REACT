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
                navigate('/home');
            })
            .catch(error => {
                console.error('Error al registrar usuario:', error);
                alert('Error al registrar usuario. Intenta de nuevo.');
            });
    };

    return (
        <div>
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombres" value={userData.nombres} onChange={handleChange} disabled />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} disabled />
                </div>
                <div>
                    <label>Código Tecsup:</label>
                    <input type="text" name="codigoTecsup" value={userData.codigoTecsup} onChange={handleChange} required />
                </div>
                <div>
                    <label>Carrera:</label>
                    <select name="carreraId" value={userData.carrera.id} onChange={handleChange} required>
                        <option value="">Selecciona una Carrera</option>
                        {carreras.map(carrera => (
                            <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
