// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginButton from './components/LoginButton';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import ReservaForm from './components/ReservaForm';
import ReservaList from './components/ReservaList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginButton />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reserva/nueva" element={<ReservaForm />} />
          <Route path="/reserva/misreservas" element={<ReservaList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
