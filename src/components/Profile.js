import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig'; // Asegúrate de importar la instancia configurada

import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState({
        nombres: '',
        email: '',
        codigoTecsup: '',
        carrera: { id: '' },  // Asegúrate de que la estructura coincida con la esperada en el backend
    });
    const [carreras, setCarreras] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener datos del usuario desde el perfil
        axiosInstance.get('/api/user/profile')
            .then(response => {
                const { nombres, email, codigoTecsup, carrera } = response.data;
                setUserData({
                    nombres: nombres || '',
                    email: email || '',
                    codigoTecsup: codigoTecsup || '',
                    carrera: { id: carrera ? carrera.id : '' },
                });
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
                carrera: { id: value },
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
        axiosInstance.put('/api/user/profile', userData)
            .then(() => {
                alert('Perfil actualizado exitosamente!');
                navigate('/home');
            })
            .catch(error => {
                console.error('Error al actualizar perfil:', error);
                alert('Error al actualizar perfil. Intenta de nuevo.');
            });
    };

    return (
        <div>
            <h1>Actualizar Perfil</h1>
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
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default Profile;
