import { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Container } from 'react-bootstrap';
import OpcionCard from '../components/common/OpcionCard';
import '../assets/styles/VerLugares.css'; 
import { getLugares, sendTestLugar } from '../services/LugarService';

export const VerLugares = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedLugares, setSearchedLugares] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const lugares = await getLugares();
      const lugaresEncontrados = lugares.filter(lugar =>
        lugar.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      ).map(lugar => {
        lugar.foto = lugar.foto == null ? "https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg" : lugar.foto;
        return lugar;
      });
      setSearchedLugares(lugaresEncontrados);
      console.log("Lugares encontrados:", lugaresEncontrados);
    } catch (error) {
      console.error('Error al buscar los lugares', error);
    }
  };

  return (
    <>
      <LinkContainer to="/inicio">
        <Button variant="success">Volver a opciones</Button>
      </LinkContainer>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="searchBar" className="d-flex">
          <Form.Control
            type="text"
            placeholder="Buscar lugares"
            className="me-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="success" type="submit">Buscar</Button>
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
