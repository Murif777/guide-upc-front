import React from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { LinkContainer } from 'react-router-bootstrap';

function MenuOpciones() {
  return (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#crear-ruta">
      <h5>Seleccione una opcion</h5>
      <Row>
        <Col sm={4}>
          <ListGroup>
            <LinkContainer to="/inicio/crear-ruta">
              <ListGroup.Item action href="#crear-ruta">
                Crear una ruta
              </ListGroup.Item>
            </LinkContainer>
            <LinkContainer to="/inicio/historial-rutas">
              <ListGroup.Item action href="#historial-rutas">
                Ver historial de rutas
              </ListGroup.Item>
            </LinkContainer>
            <LinkContainer to="/inicio/ver-lugares">
              <ListGroup.Item action href="#ver-lugares">
                Ver lugares
              </ListGroup.Item>
            </LinkContainer>
          </ListGroup>
        </Col>
       
      </Row>
    </Tab.Container>
  );
}

export default MenuOpciones;
