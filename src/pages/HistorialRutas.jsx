
import { Accordion, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getRutasByUsuario } from '../services/RutaService';
import { getProfile } from '../services/UsuarioService'; // Asegúrate de importar el servicio del perfil del usuario
import '../assets/styles/HistorialRutas.css';
import SistemaRutas from '../components/specificComponent/SistemaRutas';
import VentanaEmergente from '../components/common/VentanaEmergente';
import { getServer } from '../helpers/axios_helper';
import NavigationControls from '../components/common/NavigationControls';

export const HistorialRutas = () => {
  const [rutas, setRutas] = useState([]);
  const [id, setId] = useState("");
  const [activeKey, setActiveKey] = useState(null);  
  const [selectedStartLocation, setSelectedStartLocation] = useState(""); 
  const [selectedEndLocation, setSelectedEndLocation] = useState("");

  const [showTutorial, setShowTutorial] = useState(() => { 
    return localStorage.getItem('HistorialTutorialVisto') !== 'true'; 
  }
); 

  const handleCloseTutorial = () => { 
    setShowTutorial(false); 
    localStorage.setItem('HistorialTutorialVisto', 'true'); 
  };
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
  const TutorialContent = () => (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">¡Bienvenido al Historial de Rutas!</h3>
        <p>Aquí podrás ver todas las rutas que has consultado anteriormente. Te explicamos cómo usar esta sección:</p>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Visualización de Rutas</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Encontrarás una lista de todas tus rutas guardadas</li>
          <li>Cada ruta muestra el punto de partida y el destino</li>
          <li>Las rutas se muestran en un formato desplegable para fácil acceso</li>
        </ul>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Uso del Historial</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Haz clic en cualquier ruta para desplegarla</li>
          <li>Al desplegar una ruta, verás el mapa con el recorrido completo</li>
          <li>Puedes abrir y cerrar las rutas las veces que necesites</li>
        </ul>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Navegación</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Utiliza el botón "Volver a opciones" para regresar al menú principal</li>
          <li>Puedes consultar todas tus rutas sin límite de tiempo</li>
          <li>Las rutas se mantienen guardadas para futuras consultas</li>
        </ul>
      </div>
    </div>
  );
  return (
    <>
        <VentanaEmergente
        isOpen={showTutorial}
        onClose={handleCloseTutorial}
        title="Tutorial - Historial de rutas"
        width="600px"
      >
        <TutorialContent />
      </VentanaEmergente>
      <NavigationControls 
        setShowTutorial={setShowTutorial} 
        tutorialKey="HistorialTutorialVisto" 
      />
      <div>
          <div className="Title">
            <h5>Seleccione una ruta del historial</h5>
          </div>
          <div className='Container'>
          <Accordion activeKey={activeKey} onSelect={handleSelect} flush>
                    {rutas.length > 0 ? (
                    rutas.map((ruta, index) => (
                        <Accordion.Item eventKey={index.toString()} key={index}> 
                        <Accordion.Header className='Item' >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          paddingRight:'10px'
                        }}>
                          <Image 
                            src={`http://${getServer()}:8080/uploads/1732052594067-111e7904-aae6-4a6d-af9b-79799b48fc32.png`}
                            style={{ width: '100%', height: '100%'}} 
                            alt="Icono"
                          />
                        </div>
                          Ruta de {formatDisplayName(ruta.lugarPartida)} a {formatDisplayName(ruta.lugarLlegada)}</Accordion.Header> 
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
const formatDisplayName = (name) => {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
export default HistorialRutas;
