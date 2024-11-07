import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Inicio from './components/Inicio';
import CrearRuta from './components/CrearRuta';
import HistorialRutas from './components/HistorialRutas';
import VerLugares from './components/VerLugares';
import Registrar from './components/Registrar';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio/*" element={<Inicio />} />
        {/* Rutas anidadas dentro de Inicio */}
        <Route path="/inicio/crear-ruta" element={<CrearRuta />} />
        <Route path="/inicio/historial-rutas" element={<HistorialRutas />} />
        <Route path="/inicio/ver-lugares" element={<VerLugares />} />
        {/* Ruta predeterminada */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      {/*<Footer />*/}
    </Router>
  );
}

export default App;
