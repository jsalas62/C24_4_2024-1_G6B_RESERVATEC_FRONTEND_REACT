import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaReservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        // Obtener las reservas del usuario
        axios.get('/api/reserva/misreservas')
            .then(response => setReservas(response.data))
            .catch(error => console.error('Error fetching reservas:', error));
    }, []);

    return (
        <div>
            <h2>Mis Reservas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Campo</th>
                        <th>Horario</th>
                        <th>Fecha</th>
                        <th>Comentario</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map(reserva => (
                        <tr key={reserva.id}>
                            <td>{reserva.campo.nombre}</td>
                            <td>{reserva.horario.horaInicio} - {reserva.horario.horaFin}</td>
                            <td>{reserva.fecha}</td>
                            <td>{reserva.comentario}</td>
                            <td>{reserva.estado.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaReservas;
