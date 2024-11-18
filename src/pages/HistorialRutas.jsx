import { LinkContainer } from 'react-router-bootstrap';
import { Button, Accordion } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getRutasByUsuario } from '../services/RutaService';
import { getProfile } from '../services/UsuarioService'; // Asegúrate de importar el servicio del perfil del usuario
import '../assets/styles/HistorialRutas.css';
import SistemaRutas from '../components/specificComponent/SistemaRutas';

export const HistorialRutas = () => {
  const [rutas, setRutas] = useState([]);
  const [id, setId] = useState("");
  const [activeKey, setActiveKey] = useState(null);  
  const [selectedStartLocation, setSelectedStartLocation] = useState(""); 
  const [selectedEndLocation, setSelectedEndLocation] = useState("");
  useEffect(() => {
    // Obtener el perfil del usuario
    getProfile()
      .then(perfil => {
        console.log("Perfil obtenido:", perfil);
        setId(perfil.id);
        // Obtener las rutas una vez que se tiene el id del usuario
        getRutasByUsuario(perfil.id)
          .then(data => {
            setRutas(data);
          })
          .catch(error => {
            console.error('Error al obtener rutas:', error);
          });
      })
      .catch(error => {
        console.error('Error al obtener el perfil', error);
      });
  }, []);
  const handleSelect = (key) => { 
    setActiveKey(activeKey === key ? null : key); // Alternar la selección 
    const rutaSeleccionada = rutas[key]; 
    if (rutaSeleccionada) { 
      setSelectedStartLocation(rutaSeleccionada.lugarPartida); 
      console.log("PARTIDA: "+ rutaSeleccionada.lugarPartida);
      
      setSelectedEndLocation(rutaSeleccionada.lugarLlegada); 
      console.log("LLEGADA: "+ rutaSeleccionada.lugarLlegada);

    }
  };
  return (
    <>
      <LinkContainer to="/inicio">
        <Button variant="success">Volver a opciones</Button>
      </LinkContainer>
      <div className="fullscreen">
          <div className="centered-container">
            <h5>Seleccione una ruta del historial</h5>
            <Accordion activeKey={activeKey} onSelect={handleSelect} flush>
                    {rutas.length > 0 ? (
                    rutas.map((ruta, index) => (
                      <Accordion.Item eventKey={index.toString()} key={index}> 
                        <Accordion.Header>Ruta de {ruta.lugarPartida} a {ruta.lugarLlegada}</Accordion.Header> 
                        <Accordion.Body> 
                        {activeKey === index.toString() && (
                          selectedStartLocation && selectedEndLocation && (
                            <SistemaRutas startLocation={selectedStartLocation} endLocation={selectedEndLocation} /> 
                          )
                          )}
                        </Accordion.Body> 
                      </Accordion.Item>
                    ))
                    
                  ) : (
                    <Accordion.Item eventKey="0"> 
                      <Accordion.Header>No hay rutas disponibles</Accordion.Header> 
                      <Accordion.Body> 
                        No hay rutas disponibles en este momento. 
                      </Accordion.Body> 
                    </Accordion.Item>
                )}
              </Accordion>
          </div>
      </div>
    </>
  );
}

export default HistorialRutas;
