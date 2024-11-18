import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SistemaRutas from './SistemaRutas';
import { getLugares } from '../../services/LugarService';
import { sendRuta } from '../../services/RutaService'; // Importa el servicio 
import { getProfile} from '../../services/UsuarioService';

function MenuRutas() {
  const navigate = useNavigate();
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [submittedStart, setSubmittedStart] = useState(null);
  const [submittedEnd, setSubmittedEnd] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [lugares, setLugares] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    // Obtener los lugares desde el servicio
    getLugares()
      .then(data => {
        setLugares(data);
      })
      .catch(error => {
        console.error('Error al obtener los lugares:', error);
      });
      getProfile()
      .then(perfil => {
        console.log("Perfil obtenido:", perfil);
        setId(perfil.id);
      })
      .catch(error => {
        console.error('Error al obtener el perfil', error);
      });
  }, []);

  const handleRouteSearch = () => {
    if (startLocation && endLocation) {
      setLoading(true);
      setTimeout(() => {
        setSubmittedStart(startLocation);
        setSubmittedEnd(endLocation);
        setLoading(false);
      }, 500); // Simula una solicitud de red
      saveRoute(startLocation, endLocation, id);
    }
  };

  const handleCam = () => {
    navigate("/inicio/cam-guide");
  };

  const saveRoute = async (start, end, userId) => { 
    try { 
      await sendRuta(userId, start, end); 
      console.log('Ruta guardada exitosamente '+userId+startLocation+endLocation); 
    } catch (error) { 
      console.error('Error al guardar la ruta:', error); 
    } 
  };

  return (
    <div style={sidebarStyle}>
      <h5>Opciones de ruta</h5>
      <div className="mb-3">
        <FormFloatingSelectExample value={startLocation} setValue={setStartLocation} options={lugares} />
      </div>
      <div className="mb-3">
        <FormFloatingSelectDestination value={endLocation} setValue={setEndLocation} options={lugares} />
      </div>
      <div className="mb-3">
        <Button variant="success" disabled={isLoading} onClick={!isLoading ? handleRouteSearch : null}>
          {isLoading ? 'Cargando...' : 'Buscar'}
        </Button>
        <Button variant="success" onClick={handleCam}>
          Usar camara
        </Button>
      </div>

      <SistemaRutas startLocation={submittedStart} endLocation={submittedEnd} />
    </div>
  );
}

function FormFloatingSelect({ controlId, label, value, setValue, options }) {
  return (
    <FloatingLabel controlId={controlId} label={label}>
      <Form.Select
        aria-label={`Floating label select for ${label}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.id} value={option.nombre}>
            {option.nombre}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
}

function FormFloatingSelectExample({ value, setValue, options }) {
  return <FormFloatingSelect controlId="floatingSelect" label="Seleccione lugar de partida" value={value} setValue={setValue} options={options} />;
}

function FormFloatingSelectDestination({ value, setValue, options }) {
  return <FormFloatingSelect controlId="floatingSelectDestination" label="Seleccione lugar de destino" value={value} setValue={setValue} options={options} />;
}

const sidebarStyle = {
  height: "40vh",
  width: "100%",
  padding: '20px',
  overflowY: 'auto',
  boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
};

export default MenuRutas;
