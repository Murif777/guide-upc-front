import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import CrearRuta from './components/CrearRuta';
import HistorialRutas from './components/HistorialRutas';
import VerLugares from './components/VerLugares';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
function App() {
// Crear una función interna para renderizar el Header y Footer condicionalmente 
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
