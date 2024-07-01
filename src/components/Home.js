// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig'; 
import { useNavigate } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';

const Home = () => {
    const [message, setMessage] = useState('');
  const navigate =useNavigate()
    useEffect(() => {
        axiosInstance.get('/api/home', { withCredentials: true })
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('Error fetching message:', error);
                setMessage('Error fetching message');
            });
    }, []);

    const handleReservar = () => {
      navigate("/reservas/todas")
    }

    return (
        <div>
            <CustomNavbar />
            <section className="section_Carrusel">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/pelota1.jpg" className="d-block w-100 img_carrusel" alt="First slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Reserva tu espacio deportivo favorito
            </h5>
            <p>Encuentra y reserva fácilmente canchas de fútbol, básquet, tenis y más. ¡Tu deporte, tu espacio, tu horario!</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/pelota2.jpg" className="d-block w-100 img_carrusel" alt="Second slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Próximamente Copa Tecsup</h5>
            <p>Prepárate para la emoción de la Copa Tecsup. ¡Muy pronto podrás participar y competir en este gran evento deportivo!</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/pelota3.jpg" className="d-block w-100 img_carrusel" alt="Third slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Deporte y Salud</h5>
            <p>El deporte es vida. ¡Mantente activo y mejora tu bienestar físico y mental! Reserva tu espacio, sal y muévete con nosotros. ¡Tu salud te lo agradecerá!</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
        </section>
    
    <section className='section_home_btn'>
    <button onClick={handleReservar} class="btn_home type1">
    <span span class="btn-txt">Reservar</span>
    </button>
    </section>
        </div>
    );
};

export default Home;
