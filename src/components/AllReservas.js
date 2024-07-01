import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './CustomNavbar';
import './ReservaList.css'; 
import ModalReserva from './ModalReserva';

const AllReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalT, setModalT] = useState(false);

    const fetchReservas = async () => {
        try {
            const response = await axiosInstance.get('/reservas');
            const sortedReservas = response.data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            setReservas(sortedReservas);
            setLoading(false);
            console.log(loading);
        } catch (err) {
            console.error('Error al cargar las reservas:', err);
            setError('Error al cargar las reservas. Inténtalo de nuevo más tarde.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservas();

        const interval = setInterval(() => {
            fetchReservas();
        }, 10000); // Actualiza cada 10 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    const handleModal = () =>{
        setModalT(true);
    }
    return (
        <div>
            <CustomNavbar />

            <div className="container mx-auto mt-5 p-4">
  <div className="flex justify-between items-center mb-5">
    <h1 className="text-3xl font-bold text-center">Todas las Reservas</h1>
    <button onClick={handleModal}
 className="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-300 hover:shadow-xl hover:from-cyan-500 hover:to-blue-400 hover:scale-105 duration-300"
>
  <svg class="w-5 fill-white" viewBox="0 0 15 15">
    <svg
      class="w-6 h-6"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke-linejoin="round"
        stroke-linecap="round"
      ></path>
    </svg>
  </svg>
</button>

    
  </div>
  {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-5">{error}</div>}
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-[#05a1e0] text-white">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Campo</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fecha</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Horario</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {reservas.map(reserva => (
          <tr key={reserva.id}>
            <td className="px-6 py-4 whitespace-nowrap">{reserva.campo.nombre}</td>
            <td className="px-6 py-4 whitespace-nowrap">{reserva.fecha}</td>
            <td className="px-6 py-4 whitespace-nowrap">{reserva.horario.horaInicio} - {reserva.horario.horaFin}</td>
            <td className="px-6 py-4 whitespace-nowrap">{reserva.estado.nombre}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
        {
        modalT ? <ModalReserva setModalT={setModalT}/> : null
        }

    
</div>
    );
};

export default AllReservas;
