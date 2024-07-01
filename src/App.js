import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginButton from './components/LoginButton';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import ReservaList from './components/ReservaList';
import AllReservas from './components/AllReservas';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectRoute from './components/ProtectRoute';

const App = () => {

  return (

    <Router>
      <Routes>

        <Route path="/" element={<LoginButton />} />

                  {/*Rutas Protegidas*/}
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectRoute/>}>
        <Route path="/inicio" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reserva/misreservas" element={<ReservaList />} />
        <Route path="/reservas/todas" element={<AllReservas />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;