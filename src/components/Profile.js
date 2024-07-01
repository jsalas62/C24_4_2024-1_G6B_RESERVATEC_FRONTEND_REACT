import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig'; // Asegúrate de importar la instancia configurada
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';

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
        axiosInstance.get('/api/user/profile', { withCredentials: true })
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
        axiosInstance.get('/api/carreras', { withCredentials: true })
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
        axiosInstance.put('/api/user/profile', userData, { withCredentials: true })
            .then(() => {
                alert('Perfil actualizado exitosamente!');
                navigate('/inicio');
            })
            .catch(error => {
                console.error('Error al actualizar perfil:', error);
                alert('Error al actualizar perfil. Intenta de nuevo.');
            });
    };

    return (
        <div>
            <CustomNavbar />
            <div className="bg-white px-6 py-5 sm:py-32 lg:px-8">
                <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true"></div>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Perfil</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">Información de Perfil.</p>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto mt-5 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="nombres" className="block text-sm font-semibold leading-6 text-gray-900">Nombre</label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="nombres"
                                    id="nombres"
                                    value={userData.nombres}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    disabled
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="codigoTecsup" className="block text-sm font-semibold leading-6 text-gray-900">Código Tecsup</label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="codigoTecsup"
                                    id="codigoTecsup"
                                    value={userData.codigoTecsup}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="carreraId" className="block text-sm font-semibold leading-6 text-gray-900">Carrera</label>
                            <div className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ">
                          {carreras.length > 0 && (
                              <p className="text-lg font-semibold">{carreras[0].nombre}</p>
                          )}
                          </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
