import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './CustomNavbar';
import './ReservaList.css';
import ModalReserva from './ModalReserva';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO, isSameDay } from 'date-fns';

const ReservaList = () => {
    const [reservas, setReservas] = useState([]);
    const [originalReservas, setOriginalReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalT, setModalT] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'fecha', direction: 'asc' });
    const [selectedDate, setSelectedDate] = useState(null);

    const fetchReservas = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/api/reserva/misreservas');
            const fetchedReservas = response.data;
            setOriginalReservas(fetchedReservas);
            filterAndSortReservas(fetchedReservas, selectedDate, sortConfig);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }, [selectedDate, sortConfig]);

    const filterAndSortReservas = (reservasToProcess, date, sortConfig) => {
        let filtered = reservasToProcess;
        if (date) {
            filtered = reservasToProcess.filter(reserva => {
                const reservaDate = parseISO(reserva.fecha);
                return isSameDay(reservaDate, date);
            });
        }

        const sorted = filtered.sort((a, b) => {
            const dateA = new Date(a.fecha);
            const dateB = new Date(b.fecha);

            if (dateA.getTime() === dateB.getTime()) {
                const timeA = a.horario.horaInicio.split(':');
                const timeB = b.horario.horaInicio.split(':');
                const minutesA = parseInt(timeA[0]) * 60 + parseInt(timeA[1]);
                const minutesB = parseInt(timeB[0]) * 60 + parseInt(timeB[1]);
                return sortConfig.direction === 'asc' ? minutesA - minutesB : minutesB - minutesA;
            }

            return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setReservas(sorted);
    };

    useEffect(() => {
        fetchReservas();
        const interval = setInterval(() => {
            fetchReservas();
        }, 10000);

        return () => clearInterval(interval);
    }, [fetchReservas]);

    useEffect(() => {
        filterAndSortReservas(originalReservas, selectedDate, sortConfig);
    }, [selectedDate, sortConfig, originalReservas]);

    const handleModal = () => {
        setModalT(true);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <CustomNavbar />
            <div className="container mx-auto mt-5 p-4">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-3xl font-bold text-center">Mis Reservas</h1>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleModal}
                            className="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-300 hover:shadow-xl hover:from-cyan-500 hover:to-blue-400 hover:scale-105 duration-300"
                        >
                            <svg className="w-5 fill-white" viewBox="0 0 15 15">
                                <svg
                                    className="w-6 h-6"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    ></path>
                                </svg>
                            </svg>
                        </button>
                        <DatePicker 
                            selected={selectedDate} 
                            onChange={date => setSelectedDate(date)} 
                            className="form-control"
                            placeholderText="Selecciona una fecha"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-5">{error.message}</div>}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#05a1e0] text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Campo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Horario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Fecha
                                    <button onClick={() => handleSort('fecha')}>
                                        {sortConfig.key === 'fecha' && sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Comentario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reservas.map(reserva => (
                                <tr key={reserva.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{reserva.campo.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{reserva.horario.horaInicio} - {reserva.horario.horaFin}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{format(parseISO(reserva.fecha), 'dd/MM/yyyy')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{reserva.comentario}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{reserva.estado.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {modalT && <ModalReserva setModalT={setModalT} />}
        </div>
    );
};

export default ReservaList;
