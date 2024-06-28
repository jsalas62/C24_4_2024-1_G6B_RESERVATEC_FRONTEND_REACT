import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './CustomNavbar';
import { Modal, Spinner } from 'react-bootstrap';
import './ReservaList.css'; // Asegúrate de importar los estilos personalizados
const ReservaList = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReservas = async () => {
        try {
            const response = await axiosInstance.get('/api/reserva/misreservas');
            setReservas(response.data);
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

    return (
        <div>
            <CustomNavbar />

            <div className="container mt-5">
                <h1>Mis Reservas</h1>
                {error && <p>Error: {error.message}</p>}
                <table className="table table-striped">
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

            <Modal show={loading} centered contentClassName="loading-modal">
                <Modal.Body className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status" />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ReservaList;