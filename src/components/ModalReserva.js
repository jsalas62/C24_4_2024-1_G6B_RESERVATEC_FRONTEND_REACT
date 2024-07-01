import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const ModalReserva = ({setModalT}) => {
    const [campos, setCampos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [selectedCampo, setSelectedCampo] = useState('');
    const [selectedHorario, setSelectedHorario] = useState('');
    const [fecha, setFecha] = useState('');
    const [comentario, setComentario] = useState('');



    useEffect(() => {
        axiosInstance.get('/api/campo')
            .then(response => setCampos(response.data))
            .catch(error => console.error('Error fetching campos:', error));

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

        setModalT(false)
    };

    const handleModalOff = () =>{
        setModalT(false)
    }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
      {/* Contenedor del modal */}
      <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
        {/* Título del modal */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Modal de Reserva</h3>
          {/* Botón para cerrar el modal */}
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            aria-label="Close modal"
            onClick={handleModalOff}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm4.95 13.536a.75.75 0 01-1.061 1.061L10 11.06l-3.889 3.537a.75.75 0 11-1.06-1.06L8.94 10 5.053 6.463a.75.75 0 111.06-1.06L10 8.94l3.889-3.536a.75.75 0 111.06 1.06L11.06 10l3.89 3.536z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* Contenido del cuerpo del modal */}
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
                    <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Reservar
          </button>
        </div>
        </form>
            </div>
      </div>
    </div>
  );
};

export default ModalReserva;
