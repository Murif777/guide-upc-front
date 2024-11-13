import { Routes, Route } from 'react-router-dom';
import Opciones from './MenuOpciones';
import CrearRuta from './CrearRuta';
import HistorialRutas from './HistorialRutas';
import VerLugares from './VerLugares';
function Inicio() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Opciones />} />
        <Route path="crear-ruta" element={<CrearRuta />} />
        <Route path="historial-rutas" element={<HistorialRutas />} />
        <Route path="ver-lugares" element={<VerLugares />} />
      </Routes>
    </>
  );
}

export default Inicio;
