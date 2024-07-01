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
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/pelota2.jpg" className="d-block w-100 img_carrusel" alt="Second slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/pelota3.jpg" className="d-block w-100 img_carrusel" alt="Third slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
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
