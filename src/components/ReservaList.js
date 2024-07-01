import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './CustomNavbar';
import './ReservaList.css';

const ReservaList = () => {
    const [reservas, setReservas] = useState([]);
    const [error, setError] = useState(null);

    const fetchReservas = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/api/reserva/misreservas');
            setReservas(response.data);
        } catch (err) {
            setError(err);
        }
    }, []); // useCallback para memoizar la función y evitar problemas con dependencias

    useEffect(() => {
        fetchReservas();

        const interval = setInterval(() => {
            fetchReservas();
        }, 10000); 

        return () => clearInterval(interval); 
    }, [fetchReservas]); // Añadir fetchReservas como dependencia

    return (
        <div>
            <CustomNavbar />
            <div className="container mx-auto mt-5 p-4">
                <h1 className="text-3xl font-bold mb-4">Mis Reservas</h1>
                {error && <p>Error: {error.message}</p>}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border-gray-200 shadow-md rounded-md">
                        <thead className="bg-[#05a1e0] text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Campo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Horario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Comentario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reservas.map(reserva => (
                                <tr key={reserva.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{reserva.campo.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{reserva.horario.horaInicio} - {reserva.horario.horaFin}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{reserva.fecha}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{reserva.comentario}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{reserva.estado.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReservaList;
