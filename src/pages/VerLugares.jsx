import { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Container } from 'react-bootstrap';
import OpcionCard from '../components/common/OpcionCard';
import VentanaEmergente from '../components/common/VentanaEmergente';
import '../assets/styles/VerLugares.css'; 
import { getLugares } from '../services/LugarService';
import VerTutorialBtn from '../components/common/VerTutorialBtn';
import { getServer } from '../helpers/axios_helper';
//import EditarLugarPic from '../components/specificComponent/ActualizarLugar';

export const VerLugares = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedLugares, setSearchedLugares] = useState([]);
  const [showTutorial, setShowTutorial] = useState(() => { 
  return localStorage.getItem('LugaresTutorialVisto') !== 'true'; 
  }
); 

  const handleCloseTutorial = () => { 
    setShowTutorial(false); 
    localStorage.setItem('LugaresTutorialVisto', 'true'); 
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const lugares = await getLugares();
      const lugaresEncontrados = lugares.filter(lugar =>
        lugar.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      ).map(lugar => {
        lugar.foto = lugar.foto == null ? "https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg" :`http://${getServer()}:8080/${lugar.foto}`;
        return lugar;
      });
      setSearchedLugares(lugaresEncontrados);
      console.log("Lugares encontrados:", lugaresEncontrados);
    } catch (error) {
      console.error('Error al buscar los lugares', error);
    }
  };

  const TutorialContent = () => (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">¡Bienvenido al Buscador de Lugares!</h3>
        <p>Aquí podrás encontrar y explorar diferentes lugares. Te explicamos cómo usar esta herramienta:</p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">Búsqueda de Lugares</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Utiliza la barra de búsqueda en la parte superior para encontrar lugares por nombre</li>
          <li>Escribe el nombre o parte del nombre del lugar que deseas encontrar</li>
          <li>Presiona el botón "Buscar" o Enter para iniciar la búsqueda</li>
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">Visualización de Resultados</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Los lugares encontrados se mostrarán en forma de tarjetas</li>
          <li>Cada tarjeta muestra:
            <ul className="list-circle pl-5 mt-1">
              <li>Una imagen del lugar</li>
              <li>El nombre del lugar</li>
              <li>Una breve descripción</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">Navegación</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Usa el botón "Volver a opciones" para regresar al menú principal</li>
          <li>Puedes realizar múltiples búsquedas sin necesidad de recargar la página</li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <VentanaEmergente
        isOpen={showTutorial}
        onClose={handleCloseTutorial}
        title="Tutorial - Buscador de Lugares"
        width="600px"
      >
        <TutorialContent />
      </VentanaEmergente>
      <div className='p-2 pb-0 ' style={{display:'flex'}}>
        <LinkContainer to="/inicio" className='Volver'>
          <Button>Volver a opciones</Button>
        </LinkContainer>
        <VerTutorialBtn setShowTutorial={setShowTutorial} tutorialKey="LugaresTutorialVisto" />
      </div>
      <Form onSubmit={handleSearch} className='Search'>
        <Form.Group controlId="searchBar" className="d-flex">
          <Form.Control
            type="text"
            placeholder="Buscar lugares"
            className="me-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">Buscar</Button>
        </Form.Group>
      </Form>

      <div className='Container'>
        {searchedLugares.map((lugar) => (
          <div className='Card' key={lugar.id}>
            <OpcionCard
              imagen={lugar.foto}
              titulo={lugar.nombre}
              descripcion={lugar.descripcion}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default VerLugares;