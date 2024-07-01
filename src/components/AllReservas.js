import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './CustomNavbar';
import { Modal, Spinner } from 'react-bootstrap';
import './ReservaList.css'; 

const AllReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReservas = async () => {
        try {
            const response = await axiosInstance.get('/reservas');
            const sortedReservas = response.data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            setReservas(sortedReservas);
            setLoading(false);
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

    return (
        <div>
            <CustomNavbar />

            <div className="container mx-auto mt-5 p-4">
  <h1 className="text-3xl font-bold text-center mb-5">Todas las Reservas</h1>
  {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5">{error}</div>}
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


            <Modal show={loading} centered contentClassName="loading-modal">
                <Modal.Body className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status" />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AllReservas;
