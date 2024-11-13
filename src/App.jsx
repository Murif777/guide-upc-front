import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Inicio from './pages/Inicio';
import CrearRuta from './pages/CrearRuta';
import HistorialRutas from './pages/HistorialRutas';
import VerLugares from './pages/VerLugares';
import LoginForm from './pages/LoginForm';
import PrivateRoute from './components/specificComponent/PrivateRoute';
import EditarPerfil from './components/specificComponent/EditarPerfil';
function App() {
const RenderHeaderFooter = ({ children }) => {
    const location = useLocation(); 
    return ( 
    <> 
      {location.pathname !== "/login" && <Header/>} 
      {children} 
      {location.pathname !== "/login" && <Footer />} 
    </> 
    );
  };
  return (
    <Router>
      <RenderHeaderFooter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/inicio/*" element={<PrivateRoute element={<Inicio />} />} />
          <Route path="/inicio/editar-perfil" element={<PrivateRoute element={<EditarPerfil />} />} />
          <Route path="/inicio/crear-ruta" element={<PrivateRoute element={<CrearRuta />} />} />
          <Route path="/inicio/historial-rutas" element={<PrivateRoute element={<HistorialRutas />} />} />
          <Route path="/inicio/ver-lugares" element={<PrivateRoute element={<VerLugares />} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </RenderHeaderFooter>
    </Router>
  );
}

export default App;
