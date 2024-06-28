import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './CustomNavbar';

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
            setError(err);
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <CustomNavbar />
            <div className="container mt-5">
                <h1>Todas las Reservas</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Campo</th>
                            <th>Fecha</th>
                            <th>Horario</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map(reserva => (
                            <tr key={reserva.id}>
                                <td>{reserva.campo.nombre}</td>
                                <td>{reserva.fecha}</td>
                                <td>{reserva.horario.horaInicio} - {reserva.horario.horaFin}</td>
                                <td>{reserva.estado.nombre}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReservas;
