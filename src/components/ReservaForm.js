import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig'; // Asegúrate de importar la instancia configurada
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './CustomNavbar';

const ReservaForm = () => {
    const [campos, setCampos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [selectedCampo, setSelectedCampo] = useState('');
    const [selectedHorario, setSelectedHorario] = useState('');
    const [fecha, setFecha] = useState('');
    const [comentario, setComentario] = useState('');

    useEffect(() => {
        // Obtener campos disponibles
        axiosInstance.get('/api/campo')
            .then(response => setCampos(response.data))
            .catch(error => console.error('Error fetching campos:', error));

        // Obtener horarios disponibles
        axiosInstance.get('/api/horario')
            .then(response => setHorarios(response.data))
            .catch(error => console.error('Error fetching horarios:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const reserva = {
            campo: { id: selectedCampo },
            horario: { id: selectedHorario },
            fecha,
            comentario,
        };

        axiosInstance.post('/api/reserva/nueva', reserva)
            .then(response => {
                alert('Reserva creada exitosamente');
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    alert(error.response.data); // Mostrar mensaje de error en un alert
                } else {
                    alert('Error creando la reserva. Por favor, intente nuevamente.');
                }
            });
    };

    return (
        <div>
            <CustomNavbar />

            <div className="container mt-5">
                <h1 className="mb-4">Crear Reserva</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Campo:</label>
                        <select className="form-select" value={selectedCampo} onChange={e => setSelectedCampo(e.target.value)}>
                            <option value="">Seleccione un campo</option>
                            {campos.map(campo => (
                                <option key={campo.id} value={campo.id}>{campo.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Horario:</label>
                        <select className="form-select" value={selectedHorario} onChange={e => setSelectedHorario(e.target.value)}>
                            <option value="">Seleccione un horario</option>
                            {horarios.map(horario => (
                                <option key={horario.id} value={horario.id}>{horario.horaInicio} - {horario.horaFin}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha:</label>
                        <input type="date" className="form-control" value={fecha} onChange={e => setFecha(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Comentario:</label>
                        <input type="text" className="form-control" value={comentario} onChange={e => setComentario(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Reservar</button>
                </form>
            </div>
        </div>
    );
};

export default ReservaForm;