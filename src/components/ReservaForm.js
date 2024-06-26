import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig'; // Asegúrate de importar la instancia configurada

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Campo:</label>
                <select value={selectedCampo} onChange={e => setSelectedCampo(e.target.value)}>
                    <option value="">Seleccione un campo</option>
                    {campos.map(campo => (
                        <option key={campo.id} value={campo.id}>{campo.nombre}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Horario:</label>
                <select value={selectedHorario} onChange={e => setSelectedHorario(e.target.value)}>
                    <option value="">Seleccione un horario</option>
                    {horarios.map(horario => (
                        <option key={horario.id} value={horario.id}>{horario.horaInicio} - {horario.horaFin}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Fecha:</label>
                <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
            </div>
            <div>
                <label>Comentario:</label>
                <input type="text" value={comentario} onChange={e => setComentario(e.target.value)} />
            </div>
            <button type="submit">Reservar</button>
        </form>
    );
};

export default ReservaForm;
