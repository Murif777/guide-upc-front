import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Options() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="success" onClick={handleShow}>
          Opciones
        </Button>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Opciones</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="mb-3">
              <TabsExample/>
            </div>
            <div className="mb-3">
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
  function TabsExample() {
    return (
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={25}>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                Crear una ruta
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Ver historial de rutas
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
               Ver lugares
              </ListGroup.Item>
              <ListGroup.Item action href="#link4">
               ...
              </ListGroup.Item>
              <ListGroup.Item action href="#link5">
                ...
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1"></Tab.Pane>
              <Tab.Pane eventKey="#link2"></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
  
export default Options;