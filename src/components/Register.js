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
        <div className=" bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Completa tus datos para poder continuar</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">Ingresa la información necesaria</p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
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
                  
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="carreraId" className="block text-sm font-semibold leading-6 text-gray-900">Carrera</label>
              <div className="mt-2.5">
                <select
                  name="carreraId"
                  id="carreraId"
                  value={userData.carrera.id}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  
                >
                  <option value="">Selecciona una Carrera</option>
                  {carreras?.map(carrera => (
                    <option key={carrera.id} value={carrera.id}>
                      {carrera.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-10">
          <button 
        type="submit" 
        className="block w-full rounded-md bg-[#05a1e0] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#048bb0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05a1e0]">
        Actualizar
      </button>
      
          </div>
        </form>
      </div>
    );
};

export default Register;
