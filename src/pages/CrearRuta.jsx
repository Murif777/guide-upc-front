import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MenuRutas from '../components/specificComponent/MenuRutas';
import Mapa from '../components/specificComponent/map';
import '../assets/styles/CrearRutas.css'; 

function CrearRutas() {
  return (
    <>
      <LinkContainer to="/inicio" className='Volver'>
        <Button>Volver a opciones</Button>
      </LinkContainer>
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
