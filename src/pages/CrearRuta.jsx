import {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MenuRutas from '../components/specificComponent/MenuRutas';
import Mapa from '../components/specificComponent/map';
import '../assets/styles/CrearRutas.css'; 
import VentanaEmergente from '../components/common/VentanaEmergente';
import VerTutorialBtn from '../components/common/VerTutorialBtn';

function CrearRutas() {
  const [showTutorial, setShowTutorial] = useState(() => { 
    return localStorage.getItem('CrearRutaTutorialVisto') !== 'true'; 
  }
); 

  const handleCloseTutorial = () => { 
    setShowTutorial(false); 
    localStorage.setItem('CrearRutaTutorialVisto', 'true'); 
  };
  const TutorialContent = () => (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">¡Bienvenido al Menu de creacion de rutas!</h3>
        <p>Aquí podras crear rutas seleccionando un punto de partida y uno de llegada, ofreciendote la ruta mas corta para 
          llegar a tu destino. Incluso puedes usar tu camara como metodo de referencia para guiarte dentro del campus
        </p>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Eleccion de puntos</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Encontrarás una lista de lugares a los cuales puedes ir</li>
          <li>La ruta muestra el punto de partida y el destino</li>
          <li>Las rutas se muestran en un formato desplegable para fácil acceso con un narrador de instrucciones para tí</li>
        </ul>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Uso de Creacion de rutas</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Haz clic en "Seleccione lugar de partida" y selecciona en donde te encuentras ahora mismo y
            haz clic en "Seleccione lugar de destino" y selecciona en donde quieres ir
          </li>
          <li>
            Da clic en el boton "Buscar"
          </li>
          <li>Se desplegará una ruta la cual te mostrará el camino mas corto a tu destino guiado por un narrador personalizado</li>
          <li>Puedes seleccionar los puntos las veces que necesites y se guardaran en tu historial</li>
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold">Uso de Creacion de rutas mediante la camara</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Para una mejor experecia al usar esta funcionalidad se recomienda usar audifonos conectados a tu dispositivo
          </li>
          <li>Haz clic en "Seleccione lugar de partida" y selecciona en donde te encuentras ahora mismo y
            haz clic en "Seleccione lugar de destino" y selecciona en donde quieres ir
          </li>
          <li>
            Da clic en el boton "Usar camara" y se desplegara la camara de tu dispositivo
          </li>
          <li>
            Es necesario que estes parado sobre un punto de referencia el cual la camara detectará 
            para saber tu localizacion, es importante que mantengas el telefono en una misma posicion apuntando hacia el suelo para mayor precision
          </li>
          <li>Una vez la camara ha detectaddo el punto de referencia se reproducirá un audio con las 
            instrucciones que debes seguir para llegar hasta otro punto de referencia</li>
          <li>Sigue las instrucciones y eventualmente llegaras a tu destino con presicion</li>
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
        title="Tutorial - Crear una ruta"
        width="600px"
      >
        <TutorialContent />
      </VentanaEmergente>
      <div className='p-2 pb-0 ' style={{display:'flex'}}>
        <LinkContainer to="/inicio" className='Volver'>
          <Button>Volver a opciones</Button>
        </LinkContainer>
        <VerTutorialBtn setShowTutorial={setShowTutorial} tutorialKey="CrearRutaTutorialVisto" />
      </div>
      <Container fluid>
        <Row>
          <Col xs={20} md={4} className="p-3">
            <MenuRutas />
          </Col>
          <Col xs={12} md={8} className="p-3">
            <div className="map-container">
              <Mapa />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CrearRutas;
