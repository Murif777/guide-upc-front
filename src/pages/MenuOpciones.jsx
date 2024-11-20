
import { LinkContainer, Button } from 'react-router-bootstrap';
import OpcionCard from '../components/common/OpcionCard';
import '../assets/styles/MenuOpciones.css'; 
import VentanaEmergente from '../components/common/VentanaEmergente';
import { useState } from 'react';
import VerTutorialBtn from '../components/common/VerTutorialBtn';
import { getServer } from '../helpers/axios_helper';

function MenuOpciones() {
  const [showTutorial, setShowTutorial] = useState(() => { 
    return localStorage.getItem('menuPrincipalTutorialVisto') !== 'true'; 
  }
); 

  const handleCloseTutorial = () => { 
    setShowTutorial(false); 
    localStorage.setItem('menuPrincipalTutorialVisto', 'true'); 
  };
  
  const TutorialContent = () => (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">¡Bienvenido al Menú Principal!</h3>
        <p>Este menú te permite acceder a todas las funcionalidades principales del sistema de navegación del campus. 
           Aquí encontrarás tres opciones principales:</p>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Crear Ruta</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Esta opción te permite crear una nueva ruta personalizada</li>
          <li>Podrás seleccionar un punto de partida y un destino</li>
          <li>Tienes dos opciones para navegar:
            <ul className="list-circle pl-5 mt-1">
              <li>Navegación con mapa interactivo y narrador de instrucciones</li>
              <li>Navegación asistida por cámara con realidad aumentada</li>
            </ul>
          </li>
        </ul>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Ver Historial de Rutas</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Accede a todas las rutas que has consultado anteriormente</li>
          <li>Visualiza rápidamente tus rutas frecuentes</li>
          <li>Vuelve a consultar cualquier ruta anterior sin necesidad de crearla nuevamente</li>
        </ul>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Ver Lugares</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Explora todos los lugares disponibles en el campus</li>
          <li>Busca lugares específicos por nombre</li>
          <li>Obtén información detallada sobre cada ubicación</li>
          <li>Visualiza imágenes y descripciones de los lugares</li>
        </ul>
      </div>
  
      <div className="mb-4">
        <h4 className="font-semibold">Navegación del Menú</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Haz clic en cualquier tarjeta para acceder a su funcionalidad</li>
          <li>Cada opción te llevará a una interfaz específica para esa tarea</li>
          <li>Puedes volver a este menú en cualquier momento desde las diferentes secciones</li>
        </ul>
      </div>
    </div>
  );
  return (
    <>
      <VentanaEmergente
        isOpen={showTutorial}
        onClose={handleCloseTutorial}
        title="Tutorial - Menu principal"
        width="600px"
      >
        <TutorialContent />
      </VentanaEmergente> 
      <div className='p-2 pb-0 '>
      <VerTutorialBtn setShowTutorial={setShowTutorial} tutorialKey="menuPrincipalTutorialVisto" />
      </div>
        <div className='Title'>
          <h5>Seleccione una opción</h5>
        </div>
        <div className='Container'>
              <LinkContainer to="/inicio/crear-ruta">
                <div className='Card'>
                  <OpcionCard
                    imagen={`http://${getServer()}:8080/uploads/1732002694310-5c20a92c-8c01-4082-8bef-f16dea5a6717.png`}
                    titulo="Crear ruta" 
                    descripcion="Crea una ruta seleccionando punto de partida y llegada"
                  />
                </div>
              </LinkContainer>
              <LinkContainer to="/inicio/historial-rutas">
                <div className='Card'>
                  <OpcionCard
                      imagen={`http://${getServer()}:8080/uploads/1732005863894-3023aa70-a92c-4924-8d0d-5f673b926163.png`}
                      titulo="Ver historial de rutas" 
                      descripcion="Consulta las rutas que has consultado anteriormente"
                    />
                </div>
              </LinkContainer>
              <LinkContainer to="/inicio/ver-lugares">
                <div className='Card'>
                  <OpcionCard
                      imagen={`http://${getServer()}:8080/uploads/1732003938466-beb1da93-8806-45d4-be83-138cb979b54b.png`}
                      titulo="Ver lugares" 
                      descripcion="Busca un lugar en especifico para obtener informacion"
                    />
                </div>
              </LinkContainer>
        </div>
    </>
  );
}

export default MenuOpciones;
