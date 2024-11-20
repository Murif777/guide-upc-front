import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Inicio from './pages/Inicio';
import CrearRuta from './pages/CrearRuta';
import HistorialRutas from './pages/HistorialRutas';
import VerLugares from './pages/VerLugares';
import LoginForm from './pages/LoginForm';
import PrivateRoute from './components/specificComponent/PrivateRoute';
import EditarPerfil from './components/specificComponent/EditarPerfil';
import RecuperarContra from './components/specificComponent/RecuperarContraForm';
import WebcamCapture from './components/specificComponent/WebcamCapture';
import { setNavigator } from './services/navigationService';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <>
      {location.pathname !== "/login" && <Header/>}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/inicio/*" element={<PrivateRoute element={<Inicio />} />} />
        <Route path="/inicio/editar-perfil" element={<PrivateRoute element={<EditarPerfil />} />} />
        <Route path="/inicio/cambiar-contra" element={<PrivateRoute element={<RecuperarContra />} />} />
        <Route path="/inicio/cam-guide" element={<PrivateRoute element={<WebcamCapture />} />} />
        <Route path="/inicio/crear-ruta" element={<PrivateRoute element={<CrearRuta />} />} />
        <Route path="/inicio/historial-rutas" element={<PrivateRoute element={<HistorialRutas />} />} />
        <Route path="/inicio/ver-lugares" element={<PrivateRoute element={<VerLugares />} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;